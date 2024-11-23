const StepThree = ({ formData, setFormData, errors, handleBlur }) => {


  return (
    <div>
      <div className="space-y-8 pt-4">

        {/* IP Address for Accessing Back Office in Staging Environment */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address for Accessing Back Office in Staging Environment<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Please input"
            value={formData.backOfficeIpAddress}
            onChange={(e) => setFormData({ ...formData, backOfficeIpAddress: e.target.value })}
            onBlur={() => handleBlur('backOfficeIpAddress')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.backOfficeIpAddress ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently:</p>
          {errors.backOfficeIpAddress && <p className="text-red-600 text-sm">{errors.backOfficeIpAddress}</p>}
        </div>


        {/* IP Address for Accessing API in Staging Environment */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address for Accessing API in Staging Environment<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Please input"
            value={formData.APIIpAddress}
            onChange={(e) => setFormData({ ...formData, APIIpAddress: e.target.value })}
            onBlur={() => handleBlur('APIIpAddress')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.APIIpAddress ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently:</p>
          {errors.APIIpAddress && <p className="text-red-600 text-sm">{errors.APIIpAddress}</p>}
        </div>


        {/* Staging Endpoint URL */}
        <div>
          <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
            Staging Endpoint URL <span className="text-red-600">*</span>
          </label>
          <input
            type="url"
            placeholder="Please input"
            value={formData.stagingEndpointURL}
            onChange={(e) => setFormData({ ...formData, stagingEndpointURL: e.target.value })}
            onBlur={() => handleBlur('stagingEndpointURL')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.stagingEndpointURL ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.stagingEndpointURL && <p className="text-red-500 text-sm">{errors.stagingEndpointURL}</p>}
        </div>


      </div>
    </div>
  );
};

export default StepThree;