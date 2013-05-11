/* Copyright (c) 2013 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */

define(function(require, exports, module) {
"use strict";
	
	console.debug("Loading perspectiveThumb");

	exports.Title = "Thumbs"
	exports.ID = "perspectiveThumb";  // ID should be equal to the directory name where the ext. is located   
	exports.Type =  "view";
	exports.Icon = "icon-picture";
	
	var TSCORE = require("tscore");	
	
	var viewContainer = undefined;
	var viewToolbar = undefined;
	var viewFooter = undefined;
	
	var supportedFileTypeThumnailing = ['jpg','jpeg','png','gif'];
	
	exports.init = function init() {
		console.debug("Initializing View "+exports.ID);
		
	    viewContainer = $("#"+exports.ID+"Container");
	    viewToolbar = $("#"+exports.ID+"Toolbar");
		viewFooter = $("#"+exports.ID+"Footer");
		
		viewContainer.empty();
		viewToolbar.empty();
		viewFooter.empty();	
		
        viewToolbar.append($("<button>", { 
            class: "btn btn-small disabled",
            disabled: true,
            title: "Create new file",
            id: this.extensionID+"CreateFileButton",    
        })
        .append( $("<i>", { class: "icon-file", }) )
        .append("New")
        .click(function() {
            $( "#dialog-filecreate" ).dialog( "open" );
        })          
        );        		
		
	    viewContainer.append($("<ol>", { 
	        style: "overflow: visible;",
	        class: "selectableFiles",
	        id: exports.ID+"SelectableFiles",
	        text: "Empty viewer."    
	    }));	
		
	    $( "#"+exports.ID+"SelectableFiles" ).selectable({
	        stop: function() {
	            TSCORE.selectedFiles = [];          
	            $( ".ui-selected", this ).each(function() {
	                TSCORE.selectedFiles.push($(this).attr("filepath"));
	            });
	            console.debug("Selected files: "+TSCORE.selectedFiles);
	         //   TSCORE.handleElementActivation();
	            
	            // On selecting only one file opens it in the viewer
	            if(TSCORE.selectedFiles.length == 1) {
					TSCORE.FileOpener.openFile(TSCORE.selectedFiles[0]);             	
	            }
	        }
	    }); 
	}
	
	exports.load = function load() {
		console.debug("Showing View "+exports.ID);
	   
		// Purging the thumbnail view, avoiding memory leak
		document.getElementById(exports.ID+"SelectableFiles").innerHTML = "";
	
	    $("#"+exports.ID+"SelectableFiles").empty();
	        
	    for (var i=0; i < TSCORE.fileList.length; i++) {
	        var fileName = TSCORE.fileList[i][0];
	        var fileExt = TSCORE.fileList[i][6];
	        var filePath = TSCORE.fileList[i][4];
	        if(supportedFileTypeThumnailing.indexOf(fileExt) >= 0) {
	            $("#"+exports.ID+"SelectableFiles").append(
	                 $('<li>', { title: fileName, filepath: filePath, class: 'ui-widget-content' }).append( 
	                    $('<img>', { title: fileName, class: "thumbImg", src: 'file:///'+filePath })));
	        } else {
	            $("#"+exports.ID+"SelectableFiles").append(
	                 $('<li>', { title: fileName, filepath: filePath, class: 'ui-widget-content' }).append(
	                    $('<span>', { class: "fileExtension", text: fileExt})));
	        }
	    }    
	    
		$( exports.ID+"CreateFileButton" ).removeClass("disabled");  
	    TSCORE.hideLoadingAnimation();     
	}
	
	exports.setFileFilter = function setFileFilter(filter) {
		console.debug("setFileFilter not implemented in "+exports.ID);
	}
	
	exports.clearSelectedFiles = function() {
	    // TODO Deselect all
		//$("#"+exports.ID+"SelectableFiles").
	}
});