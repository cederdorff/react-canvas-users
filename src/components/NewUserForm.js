import { useState } from "react";

export default function NewUserForm({ handleCreate }) {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [enrollment, setEnrollment] = useState("Student");

    function generateSortableName() {
        const nameStringArray = name.split(" ");
        const lastname = nameStringArray.pop();
        const firstnames = nameStringArray.join(" ");
        return `${lastname}, ${firstnames}`;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const id = Date.now(); // dummy generated user id
        const newUser = {
            name: name,
            sortable_name: generateSortableName(),
            avatar_url: avatarUrl,
            email: mail,
            enrollment_type: enrollment,
            id: id
        };

        handleCreate(newUser);
        e.target.reset(); // reset form
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new User</h2>
            <input type="text" name="name" placeholder="Type your name" required onChange={e => setName(e.target.value)} />
            <input type="email" name="mail" placeholder="Type your mail" required onChange={e => setMail(e.target.value)} />
            <input type="url" name="image" placeholder="Paste image url" required onChange={e => setAvatarUrl(e.target.value)} />
            <label>
                Enrollment Type
                <select onChange={e => setEnrollment(e.target.value)}>
                    <option value="Students">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
            </label>
            <button>Create User</button>
        </form>
    );
}
