import * as React from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Modal from '@mui/material/Modal';
import StudentForm from './Forms/StudentForm';


interface IProps {

}
interface IModalState {
    showModal: boolean
}

export default class Navbar extends React.Component<IProps, IModalState> {
    override state: IModalState = {
        showModal: false,
    };

    closeModal = () => {
        console.log('Modal Cerado')
        this.setState(state => ({
            showModal: false
        }))
    }
    openModal = () => {
        console.log('Modal abierto')
        this.setState(state => ({
            showModal: true
        }))
    }


    override render() {

        return (
            <Box sx={{ width: '100%', mb: '20px', display: 'flex', justifyContent: 'center', gap: '25px' }}>
                <Button onClick={this.openModal} variant='contained' > Add</Button >
                <Button variant='outlined' startIcon={<SortIcon />} > Sort</Button >

                <Modal
                    open={this.state.showModal}
                    onClose={this.closeModal}
                >

                    <><StudentForm closeModal={this.closeModal}/></>
                </Modal>
            </Box >
        )
    }
}