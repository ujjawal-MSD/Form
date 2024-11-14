import React from 'react'
import Stepper from '../Stepper';
import AgentInformation from './Forms/AgentInformation';
import Finish from './Forms/Finish';

const NewProvider = () => {

    const steps = [
        { label: 'Agent Information', content: <AgentInformation /> },
        { label: 'Finish', content: <Finish /> },
    ];


    return (
        <Stepper steps={steps} />
    )
}

export default NewProvider