import React from 'react'

class CardidateCard extends React.Component {
    componentDidMount() {
        const M = window.M
        M.AutoInit()
    }
    render() {
        const { name, title, handleChange } = this.props
        return (


            <li className="collection-item avatar" style={{ marginTop: '1rem' }}>
                <i className="material-icons circle responsive-img" style={{ fontSize: '2rem' }}>person_outline</i>

                <span className="title">{name}</span>
                <p>{title} <br />

                </p>
                <label className="secondary-content tooltipped" data-position="right" data-tooltip="Select candidate">
                    <input type="checkbox" onChange={handleChange} />

                    <span></span>
                </label>

            </li>






        )

    }

}

export default CardidateCard
