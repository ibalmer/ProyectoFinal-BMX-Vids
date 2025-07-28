import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bmx_vids',
    charset: 'utf8mb4'
};

const connection = await mysql.createConnection(config);

export class PostModel {
    static async Get(limit = 10, offset = 0) {
        try {
            const [posts] = await connection.query('SELECT * FROM post ORDER BY post.publish_date DESC LIMIT ? OFFSET ?', [limit, offset]);
            const [[{ total }]] = await connection.query('SELECT COUNT(*) AS total FROM post');
            return { posts, total };
        } catch (error) {
            console.error('Error al cargar los posts:', error);
            throw error;
        }
    }
    static async GetByCategory(typeId, limit = 10, offset = 0) {
        const query = `
        SELECT post.*, type_post.name AS category_name
        FROM post
        JOIN type_post ON post.type_id = type_post.id
        WHERE type_post.name = ?
        ORDER BY post.publish_date DESC
        LIMIT ? OFFSET ?;
        `;
        const countQuery = `
        SELECT COUNT(*) AS total
        FROM post
        JOIN type_post ON post.type_id = type_post.id
        WHERE type_post.name = ?`;
        try {
            const [posts] = await connection.query(query, [typeId, limit, offset]);
            const [[{ total }]] = await connection.query(countQuery, [typeId]);
            return { posts, total };
        } catch (error) {
            console.error('Error al obtener posts con categoría:', error);
            throw error;
        }
    }
    static async GetByFilter(filter, limit = 10, offset = 0) {
        const keywords = filter.split(',').map(word => word.trim().toLowerCase());
        const conditions = [`LOWER(title) LIKE ?`]
            .concat(keywords.map(() => 'LOWER(tags) LIKE ?'))
            .join(' OR ');
        const whereClause = `WHERE ${conditions}`;
        const baseParams = [`%${filter.toLowerCase()}%`, ...keywords.map(k => `%${k}%`)];
        const query = `SELECT * FROM post ${whereClause} LIMIT ? OFFSET ?`;
        const countQuery = `SELECT COUNT(*) AS total FROM post ${whereClause}`;
        try {
            const [results] = await connection.query(query, [...baseParams, limit, offset]);
            const [[{ total }]] = await connection.query(countQuery, baseParams);
            return { results, total };
        } catch (error) {
            console.error('Error al filtrar posts:', error);
            throw error;
        }
    }
    static async GetByID(id) {
        try {
            const [post] = await connection.query('SELECT * FROM post WHERE id = ?', [id])
            return post;

        } catch (error) {
            console.error('Error al cargar los posts:', error);
            throw error;
        }
    }
    static async Post(body) {
        const [result] = await connection.query(
            'INSERT INTO post(title,description,content,video_link,tags,author,user_id,type_id) VALUES (?,?,?,?,?,?,?,?)',
            [body.title, body.description, body.content, body.video_link, body.tags, body.author, body.user_id, body.type_id]
        );
        return [result, { title: body.title }];
    }
    static async UpdateByID(id, body) {
        const [response] = await connection.query('UPDATE post SET title = ?,description = ?,content = ?,video_link = ?,tags = ?,author = ?,user_id = ?,type_id = ? WHERE id = ?;', [body.title, body.description, body.content, body.video_link, body.tags, body.author, body.user_id, body.type_id, id]);
        if (response.affectedRows === 0)
            return [response]
        else {
            return [response, { id: id, title: body.title }];
        }
    }
    static async ModifyByID(id, body) {

        const keys = Object.keys(body);
        const values = Object.values(body);
        const fields = keys.map(key => `${key} = ?`).join(", ");
        const query = `UPDATE post SET ${fields} WHERE id = ?`;
        const [result] = await connection.query(query, [...values, id]);
        return result;
    }
    static async DeleteByID(id) {
        const [data] = await connection.query('SELECT * FROM post WHERE id = ?', [id])
        const [post] = await connection.query('DELETE FROM post WHERE id = ?', [id])
        if (data.length === 0) {
            return [post, data]
        } else {
            return [post, { id: data[0].id, title: data[0].title }];
        }
    }
};

