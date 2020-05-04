import React from 'react'

const Subjects = () => {
    return (
        <div>
            <div class="container filler">
                {/* Why is this here if nothing is in it? */}
            </div> 
            <div class="container no-color">
                <div class="box z-depth-4 scrollspy" id = "Subjects">
                    <h4 class="align-header black-text">
                        Subjects
                    </h4>
                    <div class="row">
                        <div class="col s12 m4">
                            <div class="card-panel black">
                                <h4 class = "white-text">Calculus</h4>
                                <i class="material-icons large yellow-text text-darken-1">
                                    book
                                </i>
                            
                                <p class = "white-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                            quidem nostrum doloremque sunt corrupti 
                                </p>
                            </div>
                        </div>

                        <div class="col s12 m4">
                            <div class="card-panel black">
                                <h4 class = "white-text">Algebra</h4>
                                <i class="material-icons large yellow-text text-darken-1">
                                    book
                                </i>
                               
                                    <p class = "white-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                        quidem nostrum doloremque sunt corrupti 
                                    </p>
                            </div>
                        </div>
            
                        
                        <div class="col s12 m4">
                            <div class="card-panel black">
                                <h4 class = "white-text">Physics</h4>
                                <i class="material-icons large yellow-text text-darken-1">
                                    book
                                </i>
                            
                                <p class = "white-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Sapiente, voluptatum aliquam quisquam hic explicabo a placeat recusandae enim
                                            quidem nostrum doloremque sunt corrupti 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
            <div className = "container no-color">
              <a href="/stream"class="btn indigo waves-effect waves-light">Join Stream</a>
            </div>
        </div>
    )
}

export default Subjects
