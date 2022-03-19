/**
 * @name noPictures
 * @author DarkMatter
 * @description Removes all profile pictures and server pictures
 * @version 0.3.5
 * @authorId 200612445373464576
 * @authorLink https://bubblez.app/p?DarkMatter
 * @website https://bubblez.app/p?DarkMatter
 * @source https://github.com/AFuxy/plugins/tree/main/noPictures
 * @updateUrl https://raw.githubusercontent.com/AFuxy/plugins/main/noPictures/noPictures.plugin.js
 */

 module.exports = (_ => {
    const config = {
        info: {
            name: 'NoPictures',
            authors: [
                {name: 'DarkMatter', discord_id: '200612445373464576', github_username: 'AFuxy', website: "https://bubblez.app/p?DarkMatter"}
            ],
            version: '0.3.5',
            description: 'Removes all profile pictures and server pictures',
            github_raw: '',
            github: ''
        },
        changelog: [


            /* Added Changlog*/
            {
                title: "Added", type: "added",
                items: ["Initial Release", "All profile pictures and banners will be replaced with the colour decided in settings", "All server pictures will be replaced with the colour decided in settings"]
            },


            /* Removed Changelog*/
            // {
            //     title: "Removed", type: "fixed",
            //     items: []
            // },


            /* Fixed Changelog*/
            {
                title: "Changed", type: "improved",
                items: ["You can now change the colour used for the pfp and banner", "You can now change the colour used for the server icon"]
            },


            /* Progress Changelog*/
            {
                title: "Working on", type: "progress",
                items: ["Allowing you to customize the colour - Done", "Emojies?"]
            }


        ],
        defaultConfig: [


            /* Profile Picture settings */
        { 
            type: 'category', id: 'picture', name: 'profile picture settings', collapsible: true, shown: false,
            settings: [
                { type: "switch", id: "profiles", name: "Remove Profile Pictures", note: "Removes the profile picture of every user", value: true },
                { type: "color", id: "colour", name: "Profile Colour Picker", note: "Change what colour users profile pictures will be replaced with", value: "#ff0000" },
            ]
        }, 
            /* Server Icon settings */
        { 
            type: 'category', id: 'server', name: 'server icon settings', collapsible: true, shown: false,
            settings: [
                { type: "switch", id: "servers", name: "Remove Server Icon", note: "Removes the server icon from every server", value: true },
                { type: "color", id: "colour", name: "Server Colour Picker", note: "Change what colour server icons will be replaced with", value: "#ff0000" }
            ]
        }, 
    ]
};

    

if (!global.ZeresPluginLibrary) {
    return class { load() { BdApi.showConfirmationModal("Zere's Library Missing", "Either Click Download Now to install it or manually install it. ", { confirmText: "Automatically Install", cancelText: "Cancel", onConfirm: () => { require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async(error, result, body) => {!error && result.statusCode == 200 && body ? require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, _ => BdApi.showToast("Finished downloading Zere's Plugin Library", { type: "success" })) : BdApi.showToast("Failed to download Zere's Plugin Library", { type: "error" }) }) } }) } };
} else {
    return (([Plugin, Zlib]) => {
        const { WebpackModules, Patcher, ContextMenu, Logger: { error: Error } } = Zlib;
        // const profileCSS = "IMG.avatar-b5OQ1N {padding: 60px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} div.banner-1YaD3N {background-color:"+this.settings.picture.colour+"!important; background-image:none!important;} IMG.avatar-2e8lTP {padding: 20px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} IMG.replyAvatar-sHd2sU {width:0px!important; height: 0px!important;}";
        // const serverCSS = "IMG.icon-3AqZ2e {padding: 70px!important; background-color:"+this.settings.server.colour+"!important; width:0px!important; height: 0px!important;} div.icon-1zKOXL, div.imageUploaderInner-IIRaFr {background-color:"+this.settings.server.colour+"!important; background-image:none!important;}";
        return class noPictures extends Plugin {

            /* ------------------------------------ ZLIB FUNCTIONS ------------------------------------ */
            getSettingsPanel() { const panel = this.buildSettingsPanel(); return panel.getElement(); }
            /* ------------------------------------ SYSTEM FUNCTIONS ------------------------------------ */
            onLoad() {};
            onStop() { 
                BdApi.clearCSS("profile"); 
                BdApi.clearCSS("server");
            };
            onSwitch() {
                if (this.settings.picture.profiles) {
                    BdApi.injectCSS("profile", "IMG.avatar-b5OQ1N {padding: 60px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} div.banner-1YaD3N {background-color:"+this.settings.picture.colour+"!important; background-image:none!important;} IMG.avatar-2e8lTP {padding: 20px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} IMG.replyAvatar-sHd2sU {width:0px!important; height: 0px!important;}");
                }else{
                    BdApi.clearCSS("profile");
                }
                if (this.settings.server.servers) {
                    BdApi.injectCSS("server", "IMG.icon-3AqZ2e {padding: 70px!important; background-color:"+this.settings.server.colour+"!important; width:0px!important; height: 0px!important;} div.icon-1zKOXL, div.imageUploaderInner-IIRaFr {background-color:"+this.settings.server.colour+"!important; background-image:none!important;}");
                }else{
                    BdApi.clearCSS("server");
                }
            }
            onStart() { this.onStop()

                /* ------------------------------------ PROFILE CONTENT PATCH ------------------------------------ */
                // remove profile picture from every user
                if (this.settings.picture.profiles) {
                    BdApi.injectCSS("profile", "IMG.avatar-b5OQ1N {padding: 60px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} div.banner-1YaD3N {background-color:"+this.settings.picture.colour+"!important; background-image:none!important;} IMG.avatar-2e8lTP {padding: 20px!important; background-color:"+this.settings.picture.colour+"!important; width:0px!important; height: 0px!important;} IMG.replyAvatar-sHd2sU {width:0px!important; height: 0px!important;}");
                }
                if (this.settings.server.servers) {
                    BdApi.injectCSS("server", "IMG.icon-3AqZ2e {padding: 70px!important; background-color:"+this.settings.server.colour+"!important; width:0px!important; height: 0px!important;} div.icon-1zKOXL, div.imageUploaderInner-IIRaFr {background-color:"+this.settings.server.colour+"!important; background-image:none!important;}");
                }

            }

        }
    })(global.ZeresPluginLibrary.buildPlugin(config));
}
})();