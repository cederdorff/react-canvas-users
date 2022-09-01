import { useEffect, useState } from "react";
import User from "./components/User";

function App() {
    const [users, setUsers] = useState([]);
    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [showTeachers, setShowTeachers] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("name");

    useEffect(() => {
        async function getUsers() {
            const response = await fetch("https://raw.githubusercontent.com/cederdorff/web-frontend/main/data/wu-e22a.json");
            const data = await response.json();
            setUsers(data);
        }

        getUsers();
    }, []);

    useEffect(() => {
        let result = [...users]; // copy users array
        if (!showTeachers) {
            result = result.filter(user => user.enrollment_type === "Student");
        }

        if (searchValue) {
            result = result.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
        }

        if (sortBy === "sortable_name") {
            result = result.sort((user1, user2) => user1.sortable_name.localeCompare(user2.sortable_name));
        } else if (sortBy === "name") {
            result = result.sort((user1, user2) => user1.name.localeCompare(user2.name));
        }

        setUsersToDisplay(result);
    }, [searchValue, showTeachers, sortBy, users]);

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
