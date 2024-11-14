import React from 'react'
import Stepper from '../Stepper';
import AgentInformation from '../New Client/Forms/AgentInfo';
import StagingInformation from '../New Client/Forms/StagingInformation';
import ProdInformation from '../New Client/Forms/ProdInformation';
import Finish from '../New Client/Forms/Finish';

const ExistingClient = () => {

    const steps = [
        { label: 'Agent Information', content: <AgentInformation /> },
        { label: 'Staging Information', content: <StagingInformation /> },
        { label: 'Prod Information', content: <ProdInformation /> },
        { label: 'Finish', content: <Finish /> },
    ];


    return (
        <Stepper steps={steps} />
    )
}

export default ExistingClient