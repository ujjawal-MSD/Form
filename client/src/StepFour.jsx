import { IoIosArrowDown } from "react-icons/io";
import DynamicInputFields from "./DynamicInputFields";
import DynamicLoginFields from "./Components/DynamicLoginFields";

const StepThree = ({ formData, setFormData, errors, handleBlur }) => {

  const handleIpAddressChange = (newIpAddress) => {
    setFormData({ ...formData, ipAddress: newIpAddress });
  }

  const handleLoginCredentialsChange = (newLoginCredentials) => {
    setFormData({ ...formData, loginCredentials: newLoginCredentials });
  };

  return (
    <div>
      <div className='font-semibold text-[#282F3A]'>
        <IoIosArrowDown className='inline' /> {formData.brandName}
      </div>
      <div className="space-y-8 pt-4">

        {/* End Point */}
        <div>
          <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
            End Point  <span className="text-red-600">*</span>
          </label>
          <input
            type="url"
            placeholder="Please input"
            value={formData.endPoint}
            onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
            onBlur={() => handleBlur('endPoint')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.endPoint ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.endPoint && <p className="text-red-500 text-sm">{errors.endPoint}</p>}
        </div>

        {/* Lobby Url */}
        <div>
          <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
            Lobby Url
          </label>
          <input
            type="url"
            value={formData.lobbyUrl}
            onChange={(e) => setFormData({ ...formData, lobbyUrl: e.target.value })}
            placeholder="Please input"
            onBlur={() => handleBlur('lobbyUrl')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.lobbyUrl ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.lobbyUrl && <p className="text-red-500 text-sm">{errors.lobbyUrl}</p>}
        </div>

        {/* Login Credentials */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            Login Credentials
          </label>
          <DynamicLoginFields
            values={formData.loginCredentials}
            onChange={handleLoginCredentialsChange}
            placeholderAccount="Account Name"
            placeholderPassword="Password"
            onBlur={() => handleBlur('loginCredentials')}
            errors={errors.loginCredentials || []}
          />
          {errors.loginCredentials &&
            <p className="text-red-600 text-xs">{errors.loginCredentials}</p>
          }
        </div>

        {/* IP Address */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address <span className="text-red-600">*</span>
          </label>
          <DynamicInputFields
            values={formData.ipAddress}
            onChange={handleIpAddressChange}
            placeholder="Please input"
            onBlur={(index) => handleBlur("ipAddress")}
            errors={errors.ipAddress}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently: {formData.ipAddress.length}</p>
          {errors.ipAddress && <p className="text-red-600 text-sm">{errors.ipAddress}</p>}
        </div>

      </div>
    </div>
  );
};

export default StepThree;