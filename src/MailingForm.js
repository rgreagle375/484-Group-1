import React from 'react'

state = {
    description: '',
    mailinglist: '',
}
handleChange = e =>{
    this.setState({
        //update password and email by getting id
        [e.target.id]: e.target.value
    })
}
handleSubmit = e =>{
    //prevents page refresh
    e.preventDefault();
    console.log(this.state);
}

const MailingForm =()=>{
  return (
    <div>
<div className = "container" >
    <form onSubmit = {this.handleSubmit} className = "white">
        
        <h5 className = "grey-text text-darken-3"> Stream Info</h5>
        <div className = "input-field">
            <label htmlFor = "Description">Description</label>
            <input type="desc" id="desc" onChange = {this.handleChange}></input>
         
        </div>
        <div className = "input-field">
            <label htmlFor = "MailingList">MailingList</label>
            <input type="email" id="email" onChange = {this.handleChange}></input>
        </div>
        <div className = "input-field">
            <button className = "btn yellow darken-1 z-depth-0">Generate Key</button>
        </div>
        <div className = "input-field">
            <button className = "btn yellow darken-1 z-depth-0">Start Broadcast</button>
        </div>
    </form>
</div>
</div>
    
  )
}

export default MailingForm
