import DynamicInputFields from "../DynamicInputFields";

const StepTwo = ({ formData, setFormData, errors, handleBlur }) => {

  const handleClientEmailChange = (newClientEmail) => {
    setFormData({ ...formData, clientEmail: newClientEmail });
  };

  const handleManagerSkypeIdChange = (newManagerSkypeId) => {
    setFormData({ ...formData, managerSkypeId: newManagerSkypeId });
  };

  const handleFinanceSkypeIdChange = (newFinanceSkypeId) => {
    setFormData({ ...formData, financeSkypeId: newFinanceSkypeId });
  };

  const handleWhatsappNoChange = (newWhatsappNo) => {
    setFormData({ ...formData, whatsappNo: newWhatsappNo });
  };

  const handleTelegramIdChange = (newTelegramId) => {
    setFormData({ ...formData, telegramId: newTelegramId });
  };



  return (
    <div className="space-y-8">

      {/* Client Email Id */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Email Id <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.clientEmail}
          onChange={handleClientEmailChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("clientEmail")}
          errors={errors.clientEmail}
        />
        {errors.clientEmail && (
          <span className="text-red-600 text-sm">{errors.clientEmail}</span>
        )}
      </div>


      {/* Manager Skype User Id */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Manager Skype User Id <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.managerSkypeId}
          onChange={handleManagerSkypeIdChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("managerSkypeId")}
          errors={errors.managerSkypeId}
        />
        {errors.managerSkypeId && (
          <span className="text-red-600 text-sm">{errors.managerSkypeId}</span>
        )}
      </div>

      {/* Finance Skype User Id */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Finance Skype User ID <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.financeSkypeId}
          onChange={handleFinanceSkypeIdChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("financeSkypeId")}
          errors={errors.financeSkypeId}
        />
        {errors.financeSkypeId && (
          <span className="text-red-600 text-sm">{errors.financeSkypeId}</span>
        )}

      </div>

      {/* Whatsapp No */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Whatsapp No. <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.whatsappNo}
          onChange={handleWhatsappNoChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("whatsappNo")}
          errors={errors.whatsappNo}
        />
        {errors.whatsappNo && (
          <span className="text-red-600 text-sm">{errors.whatsappNo}</span>
        )}

      </div>

      {/* Telegram Id */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Telegram Id <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.telegramId}
          onChange={handleTelegramIdChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("telegramId")}
          errors={errors.telegramId}
        />
        {errors.telegramId && (
          <span className="text-red-600 text-sm">{errors.telegramId}</span>
        )}
      </div>

    </div>
  );
};

export default StepTwo;
