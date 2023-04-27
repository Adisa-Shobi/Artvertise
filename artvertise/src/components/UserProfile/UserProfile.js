import React from 'react'
import './UserProfile.css'
import  userProfilePicture from "../../images/user.png";
import NavbarB from '../NavbarBasket/NavbarB';
import StorageService from '../../utils/storage.utils';

function UserProfile() {

    const user = StorageService.getUser();
    console.log('USER>>>', user);

    // {!user.firstName ? 'Guest' : user.firstName }

    return (
        <>
        <NavbarB />
        <div className='user'>
            <div className="user-image">
                    <img className='profile-img' src={userProfilePicture} alt="User" />
            </div>
            <div className="user-profile">
                <div className="user-info">
                    <div className="user-label">First Name:</div>
                    <div className="user-value">{!user?.firstName ? 'None' : user?.firstName}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Last Name:</div>
                    <div className="user-value">{!user?.lastName ? 'None' : user?.lastName}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Email:</div>
                    <div className="user-value">{!user?.email ? 'None' : user?.email}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Country:</div>
                    <div className="user-value">{!user?.country ? 'None' : user?.country}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">City:</div>
                    <div className="user-value">{!user?.city ? 'None' : user?.city}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">State:</div>
                    <div className="user-value">{!user?.state ? 'None': user?.state}</div>
                </div>
                </div>
        </div>
        </>
    )
}

export default UserProfile