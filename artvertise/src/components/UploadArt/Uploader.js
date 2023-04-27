import React, { useState } from 'react';
import './Uploader.css';
import NavbarB from '../NavbarBasket/NavbarB';

function Uploader() {
    const [image, setImage] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted form values:", { name, price, description });
    };

    return (
        <>
        <NavbarB />
        <div className='uploader'>
            <div className='title'>
            <h1 className="upload-logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
                <h2 className='upload-title'>Upload your Art</h2>
                <p className='upload-paragraph'>Artvertise provides you with the opportunity to showcase your artistic creations to the world by allowing you to upload your art images. Share your unique pieces with art enthusiasts and potential buyers, and gain exposure for your artwork. With Artvertise, you can reach a wider audience and take your artistic career to new heights.</p>
            </div>
            <form className='data-form' onSubmit={handleSubmit}>
                <h3 className='small-title'>Art Upload Form</h3>
                <label className='upload-label image-uploader'>
                    <input className='art-data' type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <label className='upload-label'>
                    <input className='art-data' type="text" value={name} placeholder='Art Name' onChange={(e) => setName(e.target.value)} />
                </label>
                <label className='upload-label'>
                    <input className='art-data' type="text" value={price} placeholder='Art Price' onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label className='upload-label'>
                    <textarea className='art-data' value={description} placeholder='Art Description' onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button className='uploadart-button' type="submit">Submit</button>
            </form>
        </div>
        </>
  )
}

export default Uploader