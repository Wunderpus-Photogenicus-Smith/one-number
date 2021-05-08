
import React, { useState } from 'react';
//will pass editing and delete props down from container
const Liability = ({liability, afterEdit, afterDelete}) => {

        const [isEditing, setEditingState] = useState(false)

        const onDelete = () => {
            //HTTP request for delete('http://localhost:3000/liabilities/delete/ + ._id)
            //.then(res => {
                //afterDelete(_.id)
            //})
            //.catch(err => console.log(err))
        }

        return (
            <div>
               <div>
                    <span>'Mortgage:'</span>
                    <span>'$450,000'</span>
                    <span>'-10 years old'</span>
                </div>
                   <div>
                        <span>
                        <button onClick={() => setEditingState(true)}>edit</button>
                        <button onClick={onDelete}>delete</button>
                        </span>
                  </div>
            </div>
        )
}

export default Liability;