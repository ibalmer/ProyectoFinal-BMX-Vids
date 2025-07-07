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

export class CommentsModel {

    static async GetByPostID(postID) {

        const query = `SELECT 
        comment.id AS id,
        comment.content content,
        comment.publish_date AS publish_date,
        user.user_name AS user_name,
        comment.user_id AS user_id
        FROM 
        comment
        LEFT JOIN 
        user ON comment.user_id = user.id
        WHERE 
        comment.post_id = ?
        ORDER BY 
        comment.publish_date ASC;`;

        try {
            const [comments] = await connection.query(query, [postID])
            return comments;
        } catch (error) {
            console.error('Error al obtener los comentarios', error)
            throw error;
        }
    }

    static async Post(body) {

        const result = await connection.query(
            `INSERT INTO comment(user_id,post_id,content) VALUES (?,?,?)`, [body.user_id, body.post_id, body.content]
        );

        return result;
    }

    static async DeleteByID(id) {
        const [data] = await connection.query('SELECT * FROM comment WHERE id = ?', [id])
        const [comment] = await connection.query('DELETE FROM comment WHERE id = ?', [id])

        if (data.length === 0) {
            return [comment, data]
        } else {
            return [comment];
        }
    }
}