import React from 'react'
import Stepper from '../Stepper';
import AgentInformation from './Forms/AgentInfo';
import CompanyInformation from './Forms/CompanyInformation';
import StagingInformation from './Forms/StagingInformation';
import ProdInformation from './Forms/ProdInformation';
import Finish from './Forms/Finish';

const NewClient = () => {

    const steps = [
        { label: 'Agent Information', content: <AgentInformation /> },
        { label: 'Company Information', content: <CompanyInformation /> },
        { label: 'Staging Information', content: <StagingInformation /> },
        { label: 'Prod Information', content: <ProdInformation /> },
        { label: 'Finish', content: <Finish /> },
    ];


    return (
        <Stepper steps={steps} />
    )
}

export default NewClient