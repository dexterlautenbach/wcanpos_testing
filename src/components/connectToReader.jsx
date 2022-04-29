import React, {Component} from "react";

class ConnectToTerminal extends Component {
    state = {
        loading: true,
        //  productCount: 0
    };

    render() {
        return (
            <div className='container'>
                <div>
                    {this.state.loading ?
                        <div>
                            <div className="modal modal-dialog-centered" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Select Terminal Reader</h5>
                                        </div>
                                        <div className="modal-body">
                                            <button className="btn-success btn-lg m-2" onClick={()=>this.connectToTerminal(2)}>Terminal 2</button>
                                            <button className="btn-success btn-lg m-2" onClick={()=>this.connectToTerminal(1)}>Terminal 1</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        ''}
                </div>
            </div>

        );
    }

    connectToTerminal = (terminalID) =>{
        const location = 'tml_EmOigwn7me7ov0';
        window.discoverReaders(terminalID, location);
        this.setState({loading: false});
    }
}

export default ConnectToTerminal;