import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { createRoom, reset } from "../features/room/roomSlice";
const CreateRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.room);
    const [files, setFiles] = useState("");
    const [formData, setFormData] = useState({
        name: "test",
        price: 200,
        desc: "adadasd",
        roomNumbers: "401, 203, 232, 234"
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { name, price, desc, roomNumbers } = formData;

    useEffect(() => {
        if (!user) {
            // navigate to login
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate("/rooms");
        }
    }, [isSuccess, dispatch, navigate]);


    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    //handle file change
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!name || !price || !roomNumbers) {
            setIsSubmitting(false); 
            return;
        }
        const roomArray = roomNumbers.split(",").map((item) => {
            return {
                number: parseInt(item),
                unavailableDates: [],
            };
        });

        let list = [];
        list = await Promise.all(
            Object.values(files).map(async (file) => {
                const url = await uploadImage(file);
                return url;
            })
        );
        const dataToSubmit = {
            name,
            price,
            desc,
            roomNumbers: roomArray,
            img: list,
        }
        //dispatch createRoom function
        dispatch(createRoom(dataToSubmit));
        setIsSubmitting(false);
    }
    return (
        <div className="container">
            <div>
                <h1 className="heading center">Create Room</h1>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Enter room name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={price}
                                placeholder="Enter room name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="desc">Description</label>
                            <textarea
                                name="desc"
                                onChange={handleChange}
                                value={desc}
                            ></textarea>
                        </div>

                        <div className="input-group">
                            <label htmlFor="roomNumbers">Room Numbers</label>
                            <textarea
                                name="roomNumbers"
                                onChange={handleChange}
                                value={roomNumbers}
                                placeholder="Enter room nubers seperated by commas eg: 202, 203, 204...."
                            ></textarea>
                        </div>

                        <div className="input-group">
                            <label htmlFor="img">Images</label>
                            <input
                                type="file"
                                name="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit"
                            disabled = {isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default CreateRoom
