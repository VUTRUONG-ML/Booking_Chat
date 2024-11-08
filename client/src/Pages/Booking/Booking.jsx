import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const Booking = () => {

    const { id: roomId } = useParams()
    const [room, setRoom] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        checkInDate: "",
        checkOutDate: ""
    })

    const { name, email, checkInDate, checkOutDate } = formData;

    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await fetch(`/api/rooms/${roomId}`);
                const data = await res.json();
                if (!res.ok) {
                    return console.log("There was a problem getting room");
                }
                return setRoom(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRoom();
    }, [])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataTosubmit = {
            roomId,
            name,
            email,
            checkInDate,
            checkOutDate
        }
        console.log(dataTosubmit);
    }
    return (
        <div>
            <h1 className="heading center">Book Now</h1>
            <div className="form-wrapper">
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" value={name} placeholder="Enter full name" onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" value={email} placeholder="Enter your email" onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="">In date</label>
                        <input type="date" name="checkInDate" value={checkInDate} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="">Out date</label>
                        <input type="date" name="checkOutDate" value={checkOutDate} onChange={handleChange} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Booking
