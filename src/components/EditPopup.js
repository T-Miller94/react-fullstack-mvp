import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers'
import React, { Component } from 'react'
import DeleteSubmitButton from './DeleteSubmitButton'
import EditSubmitButton from './EditSubmitButton'

export default class EditPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: null,
            title: null,
            story: null,
            password: null
        }
    }
    render() {
        const handleAuthor = (e) => {
            this.setState({author : e.target.value})
        }
        let author = this.state.author || this.props.post.author

        const handleTitle = (e) => {
            this.setState({title : e.target.value})
        }
        let title = this.state.title || this.props.post.title

        const handleStory = (e) => {
            this.setState({story : e.target.value})
        }
        let story = this.state.story || this.props.post.story

        const handlePassword = (e) => {
            this.setState({password : e.target.value})
        }

        const handleClick = (e) => {
            if(e.target.className === 'editModePopup') {
                this.props.toggleEditMode()
            }
        }
        

        return (
            this.props.editMode ?
                <div className='editModePopup' onClick={handleClick}>
                    <div className='editModeForm'>
                        <input className='editTitle' defaultValue={this.props.post.title} onChange={handleTitle} />
                        <input className='editAuthor' defaultValue={this.props.post.author} onChange={handleAuthor} />
                        <textarea className='editTextarea' defaultValue={this.props.post.story} onChange={handleStory} />
                        <input className='editPassword' placeholder='Password' type='password' onChange={handlePassword} />
                        <div className='editPopupButtonContainer'>
                            <EditSubmitButton
                                url={this.props.url}
                                setPost={this.props.setPost}
                                toggleEditMode={this.props.toggleEditMode}
                                post={this.props.post}
                                author={author}
                                title={title}
                                story={story}
                                password={this.state.password}
                                refresh={this.props.refresh} />
                            <DeleteSubmitButton
                                post={this.props.post}
                                url={this.props.url}
                                setPost={this.props.setPost}
                                password={this.state.password}
                                refresh={this.props.refresh}
                                toggleEditMode={this.props.toggleEditMode} />
                            </div>
                    </div>
                </div>
                :
                ''
        )
    }
}
