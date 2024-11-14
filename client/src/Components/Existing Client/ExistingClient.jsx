import React from 'react'
import Stepper from '../Stepper';
import AgentInformation from '../New Client/Forms/AgentInfo';
import StagingInformation from './Forms/StagingInformation';
import ProdInformation from './Forms/ProdInformation';
import Finish from './Forms/Finish';

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