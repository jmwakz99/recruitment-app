import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { selectCandidate } from '../actions/candidatesActions'
import { toggleLoader } from '../actions/uiActions'


import CandidateCard from '../components/shared/CandidateCard'
import CandidateDetails from '../components/CandidateDetails/CandidateDetails'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            candidates: []
        }
    }

    componentDidMount() {
        const M = window.M
        M.AutoInit()

        // toggle the loader to improve user experience
        this.props.toggleLoader(true)

        // fetch candidates from api
        axios.get('http://localhost:3000/candidates').then(response => {
            this.setState({
                candidates: response.data

            })
            setTimeout(() => {
                this.props.toggleLoader(false)

            }, 3000)
        }).catch(err => {
            console.log(err)
            this.props.toggleLoader(false)
        })

    }
    handleChange = (e, candidate) => {
        let inputs = document.querySelectorAll('input')
        if (e.target.checked) {
            // reachout to store/redux
            this.props.selectCandidate(candidate)
            //clear all the inputs
            inputs.forEach(input => {
                if (!input.checked) {
                    input.disabled = true

                }
            })


        } else {
            //clear all the inputs
            inputs.forEach(input => {
                if (!input.checked) {
                    input.disabled = false

                }
            })
            this.props.selectCandidate(false)


        }





    }
    render() {
        const { candidates } = this.state
        const { selectedCandidate, loader } = this.props

        return (
            <div className="container section">

                <div className="row">
                    <h4>Candidates</h4>
                    {
                        loader ?
                            <div className="col s12 m6 ">
                                <div className="progress">
                                    <div className="indeterminate"></div>

                                </div>
                                <div>Please wait...</div>
                            </div> : <div className="col s12 m6">
                                <ul className="collection" style={{ backgroundColor: "white" }}>
                                    {
                                        candidates ? candidates.map((candidate) => (
                                            <CandidateCard key={candidate.id} name={candidate.names} value={candidate} title={candidate.jobTitle} handleChange={(e) => this.handleChange(e, candidate)} />
                                        )) : null

                                    }



                                </ul>
                            </div>

                    }

                    <div className="col s12 m6">
                        {
                            selectedCandidate ? <CandidateDetails /> :
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div className="card-panel info">
                                            <span className="dark-text">
                                                Please select a candidate to view his/her details.
                            </span>
                                        </div>
                                    </div>
                                </div>

                        }



                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {

    return {
        candidates: state.candidates,
        loader: state.loader,
        selectedCandidate: state.selectedCandidate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCandidate: (candidate) => dispatch(selectCandidate(candidate)),
        toggleLoader: (status) => dispatch(toggleLoader(status))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
