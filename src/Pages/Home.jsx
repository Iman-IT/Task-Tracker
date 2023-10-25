import React from 'react'

function Home() {
  return (
      <div className='container' >
          <div className="row mx-auto justify-content-center align-content-center">
              <div className="pt-5 col-12 col-md-5 col-sm-4">
                  <p>Welcome to the</p>
                  <h1 className='fw-bold'> Task Tracker</h1>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur lorem</p>
                  <a href="tracker" className='btn  text-white text-center'>Get Started</a>
              </div>

              <div className="col-12 col-md-6 col-sm-4">
                  <img src="h1.jpg" className='img-fluid' alt="" />
              </div>
        </div>
      
      
      </div>
  )
}

export default Home