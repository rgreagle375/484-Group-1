import React from 'react'
import '../layout/Dashboard.css'
const Services = () =>{

    return(
        <div>
                <div className = "filler">
                {/* Why do we have this div if nothing is in it? */}
                </div>
            <div className="container no-color ">
                <div className=" box z-depth-4 scrollspy" id = "Services">
                    <h4 className="align-header black-text">
                        Services
                    </h4>

                    <div className="row">
                        <div className="col s12 m4">
                            <div className="card-panel black">
                                <i className="material-icons large yellow-text text-darken-1">
                                    book
                                </i>
                                <p className = "white-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                            quidem nostrum doloremque sunt corrupti 
                                </p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="card-panel black">
                                <i className="material-icons large yellow-text text-darken-1">
                                    lightbulb
                                </i>
                                    <p className = "white-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                        quidem nostrum doloremque sunt corrupti 
                                    </p>
                                </div>
                        </div>
            
                        
                        <div className="col s12 m4">
                            <div className="card-panel black">
                                <i className="material-icons large yellow-text text-darken-1">
                                    face
                                </i>
                                <p className = "white-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                            quidem nostrum doloremque sunt corrupti 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Services;