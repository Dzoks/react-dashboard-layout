import React from 'react';
import { Modal } from 'antd';

const withModal = defaultModalData => Component =>{
    class HOC extends React.Component{
        constructor(props){
            super(props);
            this.state={
                modalData:defaultModalData,
                visible:false
            };
        }

        showDialog = modalData =>{
            if (modalData){
                this.setState({
                    visible:true,
                    modalData
                })
            }else{
                this.setState({
                    visible:true
                });
            }
        }

        closeDialog= () => {
            return new Promise((resolve)=>{
                this.setState({
                    visible:false,
                    modalData:defaultModalData
                },()=>{
                    return resolve();
                })
            });

        };
    
        render(){
            const {modalData,visible}=this.state;
            const modalProps={
                visible,
                destroyOnClose:true,
                onCancel:e=>{
                    this.closeDialog().then(()=>{
                        if (this.props.onCancel)
                            this.props.onCancel(e);
                    });
                }
            };
            return <Component {...this.props} {...modalProps} modalData={modalData} />
        }
    }
    return HOC;
};

export default withModal;