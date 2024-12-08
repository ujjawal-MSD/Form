const FinalStep = ({ formData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Finish: Review Your Data</h2>
      {/* Display Dynamic Fields (Emails) */}
      <div>
        <h3 className="text-lg font-semibold">Contact Emails:</h3>
        <ul className="list-disc pl-5">
          {formData.emails && formData.emails.length > 0 ? (
            formData.emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <li>No emails provided.</li>
          )}
        </ul>
      </div>

      {/* Display Dynamic Fields (Names) */}
      <div>
        <h3 className="text-lg font-semibold">Skype Group:</h3>
        <ul className="list-disc pl-5">
          {formData.skypeGroup && formData.skypeGroup.length > 0 ? (
            formData.skypeGroup.map((skypeGroup, index) => (
              <li key={index}>{skypeGroup}</li>
            ))
          ) : (
            <li>No names provided.</li>
          )}
        </ul>
      </div>



      <div>
        <h3 className="text-lg font-semibold">Brand Name:</h3>
        <ul className="list-disc pl-5">
          {formData.brandName && formData.brandName.length > 0 ? (
            formData.brandName.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <li>No brandName provided.</li>
          )}
        </ul>
      </div>


      <div>
        <h3 className="text-lg font-semibold">Technical Support Personnel:</h3>
        <ul className="list-disc pl-5">
          {formData.technicalSupport && formData.technicalSupport.length > 0 ? (
            formData.technicalSupport.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <li>No technicalSupport provided.</li>
          )}
        </ul>
      </div>



      <hr />
      <h1>Second Step</h1>


      <div>
        <h3 className="text-lg font-semibold">Selected Country:</h3>
        <ul className="list-disc pl-5">
          {formData.selectedCountries && formData.selectedCountries.length > 0 ? (
            formData.selectedCountries.map((country, index) => (
              <li key={index}>{country}</li>
            ))
          ) : (
            <li>No Country provided.</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold">BO Admin Email:</h3>
        <ul className="list-disc pl-5">
          {formData.adminEmail && formData.adminEmail.length > 0 ? (
            formData.adminEmail.map((email, index) => (
              <li key={index}>{email}</li>
            ))
          ) : (
            <li>No adminEmail provided.</li>
          )}
        </ul>
      </div>


      <hr />
      <h1>Third Step</h1>

      <div>
        <h3 className="text-lg font-semibold">Ip Addresses:</h3>
        <ul className="list-disc pl-5">
          {formData.ipAddress && formData.ipAddress.length > 0 ? (
            formData.ipAddress.map((ip, index) => (
              <li key={index}>{ip}</li>
            ))
          ) : (
            <li>No Ip Address provided.</li>
          )}
        </ul>

        <p><strong>End Point:</strong> {formData.endPoint}</p>
        <p><strong>Lobby Url:</strong> {formData.lobbyUrl}</p>
        <p><strong>Login Credentials</strong> {JSON.stringify(formData.loginCredentials)}</p>
      </div>




      <hr />
      <h1>Fourth Step</h1>

      <div>
        <h3 className="text-lg font-semibold">Ip Addresses:</h3>
        <ul className="list-disc pl-5">
          {formData.prodIpAddress && formData.prodIpAddress.length > 0 ? (
            formData.prodIpAddress.map((ip, index) => (
              <li key={index}>{ip}</li>
            ))
          ) : (
            <li>No Ip Address provided.</li>
          )}
        </ul>

        <p><strong>End Point:</strong> {formData.prodEndPoint}</p>
        <p><strong>Lobby Url:</strong> {formData.prodLobbyUrl}</p>
        <p><strong>Login Credentials</strong> {JSON.stringify(formData.prodLoginCredentials)}</p>
      </div>




      {/* Display Normal Fields (Email, Password, etc.) */}
      <div className="mt-4">
        <p><strong>Provider</strong> {JSON.stringify(formData.provider)}</p>
        <p><strong>Wallet Type</strong> {formData.walletType}</p>
        <p><strong>Group Name</strong> {formData.groupName}</p>
        <p><strong>Company Name</strong> {formData.companyName}</p>
        <p><strong>End Point:</strong> {formData.endPoint}</p>
        <p><strong>Lobby Url:</strong> {formData.lobbyUrl}</p>
        <p><strong>Other Info:</strong> {formData.otherCountry}</p>




      </div>
    </div>
  );
};

export default FinalStep;
