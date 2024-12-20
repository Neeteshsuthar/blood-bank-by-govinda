import { useEffect, useState } from "react"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../init-firebase";

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );

        const role = userDoc.docs[0]?.data().role;
        setUserRole(role);

        if (role === "Donor") {
          // Fetch Receivers
          fetchMatchingUsers("Receiver");
        } else if (role === "Receiver") {
          // Fetch Donors
          fetchMatchingUsers("Donor");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const fetchMatchingUsers = async (roleToFetch) => {
      try {
        const q = query(collection(db, "users"), where("role", "==", roleToFetch));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data());
        setMatchingUsers(users);
      } catch (error) {
        console.error("Error fetching matching users:", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userRole && (
        <p>
          Logged in as a <strong>{userRole}</strong>
        </p>
      )}

      <h2>Matching Users:</h2>
      {matchingUsers.length > 0 ? (
        matchingUsers.map((user, index) => (
          <div key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))
      ) : (
        <p>No matching users found.</p>
      )}
    </div>
  );
};

export default Dashboard;
