import React from 'react'

function CardidateCard({ name, title }) {
    return (
        <div>
            <div className="row">
                <div className="col s12 m6 offset-m2 offset-l3">
                    <div className="card-panel grey lighten-5 z-depth-1 hoverable" style={{ cursor: 'pointer' }}>
                        <div className="row valign-wrapper">
                            <div className="col s2 md-6">
                                <i className="material-icons circle responsive-img" style={{ fontSize: '3rem' }}>person_outline</i>

                            </div>
                            <div className="col s10">
                                <h5>{name}</h5>
                                <div className="black-text">
                                    {title}



                                </div>
                                <span className="m3 " style={{ opacity: 0.5, marginTop: '0.5rem', display: 'inline-block' }}>Applied 5 days ago from LinkedIn</span>
                            </div>
                            <div className="col s2 md-3">
                                <i className="material-icons circle responsive-img" style={{ fontSize: '3rem' }}>more_vert</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default CardidateCard
