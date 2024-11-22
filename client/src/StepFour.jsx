import { IoIosArrowDown } from "react-icons/io";
import DynamicInputFields from "./DynamicInputFields";
import DynamicLoginFields from "./Components/DynamicLoginFields";

const StepFour = ({ formData, setFormData, errors, handleBlur }) => {

  const handleProdIpAddressChange = (newProdIpAddress) => {
    setFormData({ ...formData, prodIpAddress: newProdIpAddress });
  }

  const handleProdLoginCredentialsChange = (newProdLoginCredentials) => {
    setFormData({ ...formData, prodLoginCredentials: newProdLoginCredentials });
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
            value={formData.prodEndPoint}
            onChange={(e) => setFormData({ ...formData, prodEndPoint: e.target.value })}
            onBlur={() => handleBlur('prodEndPoint')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.prodEndPoint ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.prodEndPoint && <p className="text-red-500 text-sm">{errors.prodEndPoint}</p>}
        </div>

        {/* Lobby Url */}
        <div>
          <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
            Lobby Url
          </label>
          <input
            type="url"
            value={formData.prodLobbyUrl}
            onChange={(e) => setFormData({ ...formData, prodLobbyUrl: e.target.value })}
            placeholder="Please input"
            onBlur={() => handleBlur('prodLobbyUrl')} // Trigger blur validation
            className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.prodLobbyUrl ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
          />
          {errors.prodLobbyUrl && <p className="text-red-500 text-sm">{errors.prodLobbyUrl}</p>}
        </div>

        {/* Login Credentials */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            Login Credentials
          </label>
          <DynamicLoginFields
            values={formData.prodLoginCredentials}
            onChange={handleProdLoginCredentialsChange}
            placeholderAccount="Account Name"
            placeholderPassword="Password"
            onBlur={() => handleBlur('prodLoginCredentials')}
            errors={errors.prodLoginCredentials || []}
          />
          {errors.prodLoginCredentials &&
            <p className="text-red-600 text-xs">{errors.prodLoginCredentials}</p>
          }
        </div>

        {/* IP Address */}
        <div>
          <label className="block text-sm font-medium text-[#1F2225]">
            IP Address <span className="text-red-600">*</span>
          </label>
          <DynamicInputFields
            values={formData.prodIpAddress}
            onChange={handleProdIpAddressChange}
            placeholder="Please input"
            onBlur={(index) => handleBlur("prodIpAddress")}
            errors={errors.prodIpAddress}
          />
          <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently: {formData.prodIpAddress.length}</p>
          {errors.prodIpAddress && <p className="text-red-600 text-sm">{errors.prodIpAddress}</p>}
        </div>

      </div>
    </div>
  );
};

export default StepFour;