import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bmx_vids',
    charset: 'utf8mb4'
};

const connection = await mysql.createConnection(config);

export class UserModel {

    static async Get(limit = 10, offset = 0) {
        try {
            const [users] = await connection.query('SELECT * FROM user LIMIT ? OFFSET ?', [limit, offset]);
            const [[{ total }]] = await connection.query('SELECT COUNT(*) AS total FROM user');
            return { users, total };
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
            throw error;
        }
    }

    static async GetByFilter(filter, limit = 10, offset = 0) {
        const keywords = filter.split(',').map(word => word.trim().toLowerCase());

        const conditions = [
            `LOWER(user_name) LIKE ?`,
            `LOWER(name) LIKE ?`,
            `LOWER(last_name) LIKE ?`,
            `LOWER(email) LIKE ?`
        ].concat(keywords.map(() => `
        LOWER(user_name) LIKE ? OR 
        LOWER(name) LIKE ? OR 
        LOWER(last_name) LIKE ? OR 
        LOWER(email) LIKE ?
    `)).join(' OR ');

        const whereClause = `WHERE ${conditions}`;

        // Parámetros base: primera coincidencia exacta con todo el filter
        const baseParams = [
            `%${filter.toLowerCase()}%`, // username
            `%${filter.toLowerCase()}%`, // name
            `%${filter.toLowerCase()}%`, // last_name
            `%${filter.toLowerCase()}%`  // email
        ];

        // Para cada keyword, repetimos 4 veces (una por cada campo)
        keywords.forEach(k => {
            const param = `%${k}%`;
            baseParams.push(param, param, param, param);
        });

        const query = `SELECT * FROM user ${whereClause} LIMIT ? OFFSET ?`;
        const countQuery = `SELECT COUNT(*) AS total FROM user ${whereClause}`;

        try {
            const [results] = await connection.query(query, [...baseParams, limit, offset]);
            const [[{ total }]] = await connection.query(countQuery, baseParams);
            return { results, total };
        } catch (error) {
            console.error('Error al filtrar usuarios:', error);
            throw error;
        }
    }


    static async GetByID(id) {
        try {
            const [user] = await connection.query('SELECT * FROM user WHERE id = ?', [id])
            return user;

        } catch (error) {
            console.error('Error al cargar el usuario:', error);
            throw error;
        }

    }

    static async GetByEmail(email) {
        try {
            const [user] = await connection.query('SELECT * FROM user WHERE email = ?', [email])
            console.log('user del modelo:' ,user)
            return user;

        } catch (error) {
            console.log('el error del modelo')
            console.error('Error al cargar el usuario:', error);
            return;
        }
    }


    static async Post(body) {

        const saltRounds = parseInt(process.env.BCRYPTROUNDS)

        const hashedPassword = await bcrypt.hash(body.user_password, saltRounds);

        const [result] = await connection.query(
            `INSERT INTO user (user_name, name, last_name, user_password, email)
         VALUES (?, ?, ?, ?, ? )`,
            [
                body.user_name,
                body.name,
                body.last_name,
                hashedPassword,
                body.email
            ]
        );

        return [result, { username: body.user_name }];
    }

    static async UpdateByID(id, body) {

        const saltRounds = parseInt(process.env.BCRYPTROUNDS)
        const hashedPassword = await bcrypt.hash(body.user_password, saltRounds);

        const [response] = await connection.query(
            `UPDATE user 
         SET user_name = ?, name = ?, last_name = ?, user_password = ?, email = ?, user_type = ? 
         WHERE id = ?;`,
            [
                body.user_name,
                body.name,
                body.last_name,
                hashedPassword,
                body.email,
                body.user_type,
                id
            ]
        );

        if (response.affectedRows === 0)
            return [response];
        else {
            return [response, { id, user_name: body.user_name }];
        }
    }

    static async ModifyByID(id, body) {

        if (body.user_password) {
            const saltRounds = parseInt(process.env.BCRYPTROUNDS);
            const hashedPassword = await bcrypt.hash(body.user_password, saltRounds);
            body.user_password = hashedPassword;
        }

        const keys = Object.keys(body);
        const values = Object.values(body);

        const fields = keys.map(key => `${key} = ?`).join(", ");
        const query = `UPDATE user SET ${fields} WHERE id = ?`;

        const [result] = await connection.query(query, [...values, id]);

        return result;
    }


    static async DeleteByID(id) {
        const [data] = await connection.query('SELECT * FROM user WHERE id = ?', [id])
        const [user] = await connection.query('DELETE FROM user WHERE id = ?', [id])

        if (data.length === 0) {
            return [user, data]
        } else {
            return [user, { user_name: data[0].user_name, email: data[0].email }];
        }
    }
};

