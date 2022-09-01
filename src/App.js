import { useEffect, useState } from "react";
import User from "./components/User";

function App() {
    const [users, setUsers] = useState([]);
    const [showTeachers, setShowTeachers] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("name");

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/cederdorff/web-frontend/main/data/wu-e22a.json")
            .then(res => res.json())
            .then(setUsers);
    }, []);

    let usersToDisplay = [...users]; // copy users array

    if (!showTeachers) {
        usersToDisplay = usersToDisplay.filter(user => user.enrollment_type === "Student");
    }
    if (searchValue) {
        usersToDisplay = usersToDisplay.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
    }

    if (sortBy === "sortable_name") {
        usersToDisplay = usersToDisplay.sort((user1, user2) => user1.sortable_name.localeCompare(user2.sortable_name));
    } else if (sortBy === "name") {
        usersToDisplay = usersToDisplay.sort((user1, user2) => user1.name.localeCompare(user2.name));
    } else if (sortBy === "enrollment_type") {
        usersToDisplay = usersToDisplay.sort((user1, user2) => user1.enrollment_type.localeCompare(user2.enrollment_type));
    }

    return (
        <>
            <header>
                <h1>Canvas Users</h1>
                <label>
                    Show Teachers
                    <input type="checkbox" checked={showTeachers} onChange={() => setShowTeachers(!showTeachers)} />
                </label>
                <label>
                    Search
                    <input type="search" placeholder="Search by name" onChange={e => setSearchValue(e.target.value)} />
                </label>
                <label>
                    Sort by
                    <select onChange={e => setSortBy(e.target.value)}>
                        <option value="name">First name</option>
                        <option value="sortable_name">Last name</option>
                        <option value="enrollment_type">Enrollment</option>
                    </select>
                </label>
            </header>
            <main>
                <section className="grid-container">
                    {usersToDisplay.map(user => (
                        <User key={user.id} user={user} />
                    ))}
                </section>
            </main>
        </>
    );
}

export default App;
