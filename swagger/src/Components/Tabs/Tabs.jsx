import posts from '../../posts.json'
export function Tabs({togglePost}) {
    return (
        <div className='endpoint-div'>
            {posts.map(((post, i) =>
                <div key={i} className='endpoint-box'>
                    <a className='endpoint' onClick={() => togglePost(post)} >{post.title}</a>
                    <span className='method'>{post.method}</span>
                </div>
            ))}
        </div>
    )
}