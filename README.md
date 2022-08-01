# GVE DevNet Webex Device WebRTC Content Second Display Macro

Webex Device macro to show content in a meeting on second display when in a WebRTC call. 


## Contacts
* Gerardo Chaves (gchaves@cisco.com)

## Solution Components
* Webex Devices


## Installation/Configuration

If you are unfamiliar with Cisco Room device macros, this is a good article to get started:
https://help.webex.com/en-us/np8b6m6/Use-of-Macros-with-Room-and-Desk-Devices-and-Webex-Boards  

Load the Javascript code included in the  **ContentScreen2WebRTC.js** file in this repository into a new Macro in the Macro editor of the Cisco Webex Device.  
   
Before activating the macro, set the following constants in the code on your device:  

CONTENT_SOURCE: This ID of source video connector where content source (PC) is connected  
SECOND_SCREEN_ID: ID of video connector for second screen. Typically 2 
MANUAL_INVOKE: Set to **true** to install and use a custom panel button to manually show or hide content on the second screen  
AUTO_INVOKE: Set to **true** to automatically share content when a WebRTCCall is connected. Once the call ends, the device stops showing content on the second screen.  


## Usage

Once the macro is loaded and active, depending on how you configured the MANUAL_INVOKE and AUTO_INVOKE constants, you will either have to manually press the custom panel on the Touch10 or Navigator associated to the Webex device to start showing content from the content source input or just connect a WebRTC call and the macro will automatically start showing that content. 



# Screenshots


### LICENSE

Provided under Cisco Sample Code License, for details see [LICENSE](LICENSE.md)

### CODE_OF_CONDUCT

Our code of conduct is available [here](CODE_OF_CONDUCT.md)

### CONTRIBUTING

See our contributing guidelines [here](CONTRIBUTING.md)

#### DISCLAIMER:
<b>Please note:</b> This script is meant for demo purposes only. All tools/ scripts in this repo are released for use "AS IS" without any warranties of any kind, including, but not limited to their installation, use, or performance. Any use of these scripts and tools is at your own risk. There is no guarantee that they have been through thorough testing in a comparable environment and we are not responsible for any damage or data loss incurred with their use.
You are responsible for reviewing and testing any scripts you run thoroughly before use in any non-testing environment.