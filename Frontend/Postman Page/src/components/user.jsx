import { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";

const API_URL = "/api";

function User({ onSignOut }) {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await axios.get(`${API_URL}/user`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  async function updateUser(id) {
    console.log("Update clicked for user ID:", id);

    const newName = window.prompt("Enter new name:");

    if (newName === null || newName.trim() === "") {
      return;
    }

    const newEmail = window.prompt("Enter new email:");

    if (newEmail === null || newEmail.trim() === "") {
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/user/${id}`, {
        name: newName.trim(),
        email: newEmail.trim(),
      });

      console.log("User updated:", response.data);

      await getUsers();

      window.alert("User updated successfully");
    } catch (error) {
      console.error("Update failed:", error);

      window.alert(
        error.response?.data?.error ||
          "Unable to update user"
      );
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/user/${id}`);

      await getUsers();

      window.alert("User deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);

      window.alert(
        error.response?.data?.error ||
          "Unable to delete user"
      );
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="dashboard-page">
      <section className="dashboard-content">

        <header className="dashboard-header">
          <div>
            <h1>User Dashboard</h1>
            <p>Registered Users</p>
          </div>

          <button
            type="button"
            className="signout-button"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </header>

        <div className="users-table-wrapper">
          <table className="users-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      type="button"
                      className="update-button"
                      onClick={() => updateUser(user.id)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </section>
    </main>
  );
}

export default User;