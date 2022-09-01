export default function User({ user }) {
    return (
        <article>
            <img src={user.avatar_url} alt={user.name} />
            <h2>{user.name}</h2>
            <a href={`mailto: ${user.email}`}>{user.email}</a>
            <p>Role: {user.enrollment_type}</p>
        </article>
    );
}
