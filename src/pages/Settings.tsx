import { FiCreditCard, FiShield } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-blue-100 dark:text-blue-200">Manage your preferences and security settings</p>
          </div>

          {/* Settings Content */}
          <div className="p-6">
            <div className="space-y-8">
              {/* Security Settings */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center transition-colors duration-200">
                  <FiShield className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-200" />
                  Security
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      aria-label="Enable two-factor authentication"
                    >
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                        Change Password
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Update your account password
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      aria-label="Change password"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center transition-colors duration-200">
                  <FiCreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-200" />
                  Payment Methods
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-200">
                    No payment methods saved
                  </p>
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                    aria-label="Add payment method"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;