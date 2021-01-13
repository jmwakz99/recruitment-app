import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { selectCandidate } from '../actions/candidatesActions'


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
        // fetch candidates from api
        axios.get('http://localhost:3000/candidates').then(response => {
            this.setState({
                candidates: response.data

            })
        }).catch(err => {
            console.log(err)
        })

    }
    handleChange = (e, candidate) => {
        let inputs = document.querySelectorAll('input')
        if (e.target.checked) {
            this.props.selectCandidate(candidate)

            inputs.forEach(input => {
                if (!input.checked) {
                    input.disabled = true

                }
            })


        } else {
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
        const { selectedCandidate } = this.props

        return (
            <div className="container section">
                <div className="row">
                    <h4>Candidates</h4>
                    <div className="col s12 m6">
                        <ul className="collection" style={{ backgroundColor: "white" }}>
                            {
                                candidates ? candidates.map((candidate) => (
                                    <CandidateCard key={candidate.id} name={candidate.names} value={candidate} title={candidate.jobTitle} handleChange={(e) => this.handleChange(e, candidate)} />
                                )) : null

                            }



                        </ul>
                    </div>
                    <div className="col s12 m6">
                        {
                            selectedCandidate ? <CandidateDetails /> :
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div className="card-panel info">
                                            <span className="dark-text">
                                                Please selected a candidate to view his/her details.
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
        selectedCandidate: state.selectedCandidate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCandidate: (candidate) => dispatch(selectCandidate(candidate))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
