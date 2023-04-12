/*
Copyright (c) 2022 Cisco and/or its affiliates.


This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at


https://developer.cisco.com/docs/licenses


All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.


*/


// NOTE: This version is for RoomOS 11 only


import xapi from 'xapi';


// Modify constants below as needed
const CONTENT_SOURCE = 5; // ID of source video connector where content source (PC) is connected
const SECOND_SCREEN_ID = 2; // ID of video connector for second screen
const MANUAL_INVOKE = true; //Set to true to install and use a custom panel button to manually share content
const AUTO_INVOKE = true; //Set to true to automatically share content when a WebRTCCall is connected


// gsharing keeps track if sharing or not when using custom panel button
var gsharing = false;
var webrtc_mode = false;


function showContent() {
    console.log("show content...");
    xapi.command('Video Matrix Reset').catch((error) => { console.error(error); });
    xapi.command('Video Matrix Assign', { Output: SECOND_SCREEN_ID, SourceID: CONTENT_SOURCE }).catch((error) => { console.error(error); });
    gsharing = true;
    if (MANUAL_INVOKE) showCustomPanelButton();
}


function hideContent() {
    console.log("hide content...");
    xapi.command('Video Matrix Reset').catch((error) => { console.error(error); });
    gsharing = false;
    if (MANUAL_INVOKE) showCustomPanelButton();
}


function showCustomPanelButton() {
    let theName = "";
    if (gsharing) { theName = "GContent Off" } else { theName = "GContent On" }
    console.log(`Saving custom panel...`)
    xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: 'panel_toggle_gshare' },
        `<Extensions>
<Version>1.9</Version>
<Panel>
<Order>6</Order>
<PanelId>panel_toggle_gshare</PanelId>
<Origin>local</Origin>
<Location>HomeScreenAndCallControls</Location>
<Icon>Laptop</Icon>
<Color>#008094</Color>
<Name>`+ theName + `</Name>
<ActivityType>Custom</ActivityType>
</Panel>
</Extensions>`);
}


function hideCustomPanelButton() {
    xapi.Command.UserInterface.Extensions.Panel.Remove({ PanelId: 'panel_toggle_gshare' });


}


if (MANUAL_INVOKE) {
    showCustomPanelButton();
    xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
        if (event.PanelId == 'panel_toggle_gshare') {
            console.log("Toggle Google Meet content show");
            if (gsharing) { hideContent() } else { showContent() }
        }
    });
}
else {
    hideCustomPanelButton();
}

if (AUTO_INVOKE) {
    xapi.Status.UserInterface.WebView.Type.on((value) => {
        console.log(value);
        if (value === 'WebRTCMeeting') { showContent(); webrtc_mode = true; }
    });
    xapi.Event.CallDisconnect.on(() => { if (webrtc_mode) hideContent(); webrtc_mode = false })
} 