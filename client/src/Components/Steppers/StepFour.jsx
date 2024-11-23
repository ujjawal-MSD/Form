const StepFour = ({ formData, setFormData, errors, handleBlur }) => {

  return (
    <div>
      <div className="space-y-8 pt-4">

        {/* IP Address for Accessing Back Office in Production Environment */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address for Accessing Back Office in Production Environment<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Please input"
            value={formData.prodBackOfficeIpAddress}
            onChange={(e) => setFormData({ ...formData, prodBackOfficeIpAddress: e.target.value })}
            onBlur={() => handleBlur('prodBackOfficeIpAddress')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.prodBackOfficeIpAddress ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently:</p>
          {errors.prodBackOfficeIpAddress && <p className="text-red-600 text-sm">{errors.prodBackOfficeIpAddress}</p>}
        </div>


        {/* IP Address for Accessing API in Production Environment */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address for Accessing API in Production Environment<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Please input"
            value={formData.prodApiIpAddress}
            onChange={(e) => setFormData({ ...formData, prodApiIpAddress: e.target.value })}
            onBlur={() => handleBlur('prodApiIpAddress')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.prodApiIpAddress ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently:</p>
          {errors.prodApiIpAddress && <p className="text-red-600 text-sm">{errors.prodApiIpAddress}</p>}
        </div>


        {/* Production Endpoint URL */}
        <div>
          <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
            Production Endpoint URL <span className="text-red-600">*</span>
          </label>
          <input
            type="url"
            placeholder="Please input"
            value={formData.prodEndpointURL}
            onChange={(e) => setFormData({ ...formData, prodEndpointURL: e.target.value })}
            onBlur={() => handleBlur('prodEndpointURL')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.prodEndpointURL ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.prodEndpointURL && <p className="text-red-500 text-sm">{errors.prodEndpointURL}</p>}
        </div>


      </div>
    </div>
  );
};

export default StepFour;