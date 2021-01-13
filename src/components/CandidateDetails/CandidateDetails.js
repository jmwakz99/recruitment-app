import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
const M = window.M
M.AutoInit()


class CandidateDetails extends Component {
    constructor() {
        super()
        this.state = {
            applications: [],
            comment: ""
        }
    }


    componentDidMount() {
        const M = window.M
        M.AutoInit()
        // fetch all applications from api
        axios.get('http://localhost:3000/applications').then(response => {
            this.setState({
                applications: response.data

            })
        }).catch(err => {
            console.log(err)
        })





    }

    handleSubmit = (e, selectedCandidate) => {
        const { comment } = this.state
        console.log(comment)
        e.preventDefault()
        if (comment && selectedCandidate) {
            // save the question 
            axios.post('http://localhost:3000/questions', {
                comment,
                candidateId: selectedCandidate.id

            }).then((response) => {
                let textareas = document.querySelectorAll("textarea")
                textareas.forEach(chk => {

                    chk.value = ""
                })
                window.M.toast({ html: 'Your comment was succefully sent!' })

            })


        }

    }
    handleChange = (e) => {


        this.setState({
            comment: e.target.value
        })

    }


    render() {

        const { selectedCandidate } = this.props
        const { applications } = this.state

        let found = [];
        if (selectedCandidate && applications) {
            applications.forEach((apl) => {
                if (apl.candidateId === selectedCandidate.id) {
                    found.push(apl)


                }
            })


        }

        let htmlToDisplay;
        if (found.length > 0 && selectedCandidate.cv) {
            htmlToDisplay = <li className="active">
                <div className="collapsible-header active"><i className="material-icons">folder_outline</i>CV</div>
                <div className="collapsible-body"><span> <embed src="/cv.pdf" type="application/pdf" width="100%" height="600px" /></span>

                </div>
                <div>
                    <form className="col s12" onSubmit={(e) => this.handleSubmit(e, selectedCandidate)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">insert_comment</i>
                                <textarea id="icon_prefix2" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                                <label htmlFor="icon_prefix2">Comment...</label>
                                <button className="waves-effect waves-red btn-small right" type="submit">Send</button>
                            </div>
                        </div>


                    </form></div>




            </li>

        } else if (found.length > 0 && selectedCandidate.cv === false) {
            htmlToDisplay = <div className="collapsible-header"><div className="collapsible-header red-text"><i className="material-icons">error_outline</i>{selectedCandidate.names} please upload your cv</div></div>



        }




        return (
            <div>
                <h5>Candidates details</h5>
                <div className="card" style={{ backgroundColor: "transparent" }}>
                    <div class="card-content">
                        {selectedCandidate && selectedCandidate.names}
                        <p>{selectedCandidate && selectedCandidate.jobTitle}</p>
                    </div>



                    <div className="row">
                        <div className="col s12 m12">
                            <div className="card-tabs">
                                <ul id="tabs-swipe-demo" className="tabs">
                                    <li className="tab col white-text"><a className="active" href="#test-swipe-1"> Overview</a></li>
                                    <li className="tab col"><a href="#test-swipe-2">My Files</a></li>
                                    <li className="tab col"><a href="#test-swipe-3">Applications</a></li>
                                </ul>
                            </div>
                            <div className="card-content grey lighten-4">
                                <div id="test-swipe-1" className="col s12">
                                    <ul className="collection">

                                        <li className="collection-item">General Information:</li>
                                        <li className="collection-item">Tags  <span className="text-white badge">{selectedCandidate.jobTitle && selectedCandidate.jobTitle}</span></li>
                                        <li className="collection-item">Years of experience <span className="badge">{selectedCandidate.yearsOfExperience && selectedCandidate.yearsOfExperience}</span></li>
                                        <li className="collection-item">Email Address <span className="badge">{selectedCandidate.email && selectedCandidate.email}</span></li>
                                        <li className="collection-item">Phone Number <span className="badge">{selectedCandidate.phone && selectedCandidate.phone}</span></li>
                                    </ul>
                                </div>
                                <div id="test-swipe-2" className="col s12">
                                    <ul className="collapsible z-depth-1">
                                        {htmlToDisplay}




                                    </ul>
                                </div>
                                <div id="test-swipe-3" className="col s12">
                                    {found.length > 0 ? `${found.length} applications` : "No applications"}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        selectedCandidate: state.selectedCandidate

    }
}


export default connect(mapStateToProps)(CandidateDetails);
