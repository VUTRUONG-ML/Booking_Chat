import React from 'react';
import { Link } from "react-router-dom";
import './bookingList.styles.scss';

const BookingList = ({ data }) => {
    // Sample data  


    // Handler for action button  
    const handleAction = (id, action) => {
        // Implement action logic here
        console.log(`${action} user with ID ${id}`);
    };

    return (
        <div className="container">
            <div className="table-container">
                <h2>User Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Room</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => {
                            console.log("User data:", user.roomId);
                            return (
                                <tr key={user._id}>
                                    <td data-label="Name">{user.name}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Room">{user.roomId.name}</td>
                                    <td data-label="Action">
                                        <Link to={`/bookings/${user._id}`}>View</Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default BookingList;