import { useState, useEffect } from 'react'
/**
 * Custom hook for all logic associated with the Request UI
 * @function useRequest
 * @param null
 * @returns {Object} - Returns an object of request form values and functions (title, comment, available users, selected users)
 */

export function useRequest() {
   const [title, setTitle] = useState('');
   const [comment, setComment] = useState('');
   const [userlist, setUserList] = useState([])
   const [selectedUser, setSelectedUser] = useState([])

   return { userlist, selectedUser, title, comment, setUserList, setSelectedUser, setTitle, setComment }
}