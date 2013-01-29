/**
 * CSS Class Applier module for Rangy.
 * Adds, removes and toggles CSS classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2013, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.751
 * Build date: 25 January 2013
 */
rangy.createModule("CssClassApplier",function(a,b){function f(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function g(a,b){return a.className&&(new RegExp("(?:^|\\s)"+b+"(?:\\s|$)")).test(a.className)}function h(a,b){a.className?g(a,b)||(a.className+=" "+b):a.className=b}function j(a){return a.split(/\s+/).sort().join(" ")}function k(a){return j(a.className)}function l(a,b){return k(a)==k(b)}function m(a,b){return a.compareBoundaryPoints(b.START_TO_START,b)}function n(a,b,c,d,e){var f=a.node,g=a.offset,h=f,i=g;f==d&&g>e&&i++,f==b&&(g==c||g==c+1)&&(h=d,i+=e-c),f==b&&g>c+1&&i--,a.node=h,a.offset=i}function o(a,b,d,e){d==-1&&(d=b.childNodes.length);var f=a.parentNode,g=c.getNodeIndex(a);for(var h=0,i;i=e[h++];)n(i,f,g,b,d);b.childNodes.length==d?b.appendChild(a):b.insertBefore(a,b.childNodes[d])}function p(a,b,c,d,e){var f,g=[];while(f=a.firstChild)o(f,b,c++,e),g.push(f);return d&&a.parentNode.removeChild(a),g}function q(a,b){return p(a,a.parentNode,c.getNodeIndex(a),!0,b)}function r(a,b){var c=a.cloneRange();c.selectNodeContents(b);var d=c.intersection(a),e=d?d.toString():"";return c.detach(),e!=""}function s(a){var b=a.getNodes([3]),c=0,d;while((d=b[c])&&!r(a,d))++c;var e=b.length-1;while((d=b[e])&&!r(a,d))--e;return b.slice(c,e+1)}function t(a,b){if(a.attributes.length!=b.attributes.length)return!1;for(var c=0,d=a.attributes.length,e,f,g;c<d;++c){e=a.attributes[c],g=e.name;if(g!="class"){f=b.attributes.getNamedItem(g);if(e.specified!=f.specified)return!1;if(e.specified&&e.nodeValue!==f.nodeValue)return!1}}return!0}function u(a,b){for(var d=0,e=a.attributes.length,f;d<e;++d){f=a.attributes[d].name;if((!b||!c.arrayContains(b,f))&&a.attributes[d].specified&&f!="class")return!0}return!1}function v(a,b){var c;for(var d in b)if(b.hasOwnProperty(d)){c=b[d];if(typeof c=="object"){if(!v(a[d],c))return!1}else if(a[d]!==c)return!1}return!0}function y(a){var b;return a&&a.nodeType==1&&((b=a.parentNode)&&b.nodeType==9&&b.designMode=="on"||x(a)&&!x(a.parentNode))}function z(a){return(x(a)||a.nodeType!=1&&x(a.parentNode))&&!y(a)}function B(a){return a&&a.nodeType==1&&!A.test(w(a,"display"))}function D(a){if(a.data.length==0)return!0;if(C.test(a.data))return!1;var b=w(a.parentNode,"whiteSpace");switch(b){case"pre":case"pre-wrap":case"-moz-pre-wrap":return!1;case"pre-line":if(/[\r\n]/.test(a.data))return!1}return B(a.previousSibling)||B(a.nextSibling)}function E(a){var b=[],c,e;for(c=0;e=a[c++];)b.push(new d(e.startContainer,e.startOffset),new d(e.endContainer,e.endOffset));return b}function F(a,b){for(var c=0,d,e,f,g=a.length;c<g;++c)d=a[c],e=b[c*2],f=b[c*2+1],d.setStartAndEnd(e.node,e.offset,f.node,f.offset)}function G(a,b){return c.isCharacterDataNode(a)?b==0?!!a.previousSibling:b==a.length?!!a.nextSibling:!0:b>0&&b<a.childNodes.length}function H(a,d,e,f){var g,h,i=e==0;if(c.isAncestorOf(d,a))return a;if(c.isCharacterDataNode(d)){var j=c.getNodeIndex(d);if(e==0)e=j;else{if(e!=d.length)throw b.createError("splitNodeAt() should not be called with offset in the middle of a data node ("+e+" in "+d.data);e=j+1}d=d.parentNode}if(G(d,e)){g=d.cloneNode(!1),h=d.parentNode,g.id&&g.removeAttribute("id");var k,l=0;while(k=d.childNodes[e])o(k,g,l++,f);return o(g,h,c.getNodeIndex(d)+1,f),d==a?g:H(a,h,c.getNodeIndex(g),f)}if(a!=d){g=d.parentNode;var m=c.getNodeIndex(d);return i||m++,H(a,g,m,f)}return a}function I(a,b){return a.tagName==b.tagName&&l(a,b)&&t(a,b)&&w(a,"display")=="inline"&&w(b,"display")=="inline"}function J(a){var b=a?"nextSibling":"previousSibling";return function(c,d){var e=c.parentNode,f=c[b];if(f){if(f&&f.nodeType==3)return f}else if(d){f=e[b];if(f&&f.nodeType==1&&I(e,f))return f[a?"firstChild":"lastChild"]}return null}}function M(a){this.isElementMerge=a.nodeType==1,this.textNodes=[];var b=this.isElementMerge?a.lastChild:a;b&&(this.textNodes[0]=b)}function P(a,b,c){this.cssClass=a;var d,e,g,h,i=null;if(typeof b=="object"&&b!==null){c=b.tagNames,i=b.elementProperties;for(e=0;h=N[e++];)b.hasOwnProperty(h)&&(this[h]=b[h]);d=b.normalize}else d=b;this.normalize=typeof d=="undefined"?!0:d,this.attrExceptions=[];var j=document.createElement(this.elementTagName);this.elementProperties=this.copyPropertiesToElement(i,j,!0),this.elementSortedClassName=this.elementProperties.hasOwnProperty("className")?this.elementProperties.className:a,this.applyToAnyTagName=!1;var k=typeof c;if(k=="string")c=="*"?this.applyToAnyTagName=!0:this.tagNames=f(c.toLowerCase()).split(/\s*,\s*/);else if(k=="object"&&typeof c.length=="number"){this.tagNames=[];for(e=0,g=c.length;e<g;++e)c[e]=="*"?this.applyToAnyTagName=!0:this.tagNames.push(c[e].toLowerCase())}else this.tagNames=[this.elementTagName]}function Q(a,b,c){return new P(a,b,c)}a.requireModules(["WrappedSelection","WrappedRange"]);var c=a.dom,d=c.DomPosition,e="span",i=function(){function a(a,b,c){return b&&c?" ":""}return function(b,c){b.className&&(b.className=b.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)"),a))}}(),w=c.getComputedStyleProperty,x;(function(){var a=document.createElement("div");typeof a.isContentEditable=="boolean"?x=function(a){return a&&a.nodeType==1&&a.isContentEditable}:x=function(a){return!a||a.nodeType!=1||a.contentEditable=="false"?!1:a.contentEditable=="true"||x(a.parentNode)}})();var A=/^inline(-block|-table)?$/i,C=/[^\r\n\t\f \u200B]/,K=J(!1),L=J(!0);M.prototype={doMerge:function(a){var b=this.textNodes,c=b[0];if(b.length>1){var d=[],e=0,f,g;for(var h=0,i=b.length,j,k;h<i;++h){f=b[h],g=f.parentNode;if(h>0){g.removeChild(f),g.hasChildNodes()||g.parentNode.removeChild(g);if(a)for(j=0;k=a[j++];)k.node==f&&(k.node=c,k.offset+=e)}d[h]=f.data,e+=f.data.length}c.data=d.join("")}return c.data},getLength:function(){var a=this.textNodes.length,b=0;while(a--)b+=this.textNodes[a].length;return b},toString:function(){var a=[];for(var b=0,c=this.textNodes.length;b<c;++b)a[b]="'"+this.textNodes[b].data+"'";return"[Merge("+a.join(",")+")]"}};var N=["elementTagName","ignoreWhiteSpace","applyToEditableOnly","useExistingElements","removeEmptyElements"],O={};P.prototype={elementTagName:e,elementProperties:{},ignoreWhiteSpace:!0,applyToEditableOnly:!1,useExistingElements:!0,removeEmptyElements:!0,copyPropertiesToElement:function(a,b,c){var d,e,f={},g,i,k,l;for(var m in a)if(a.hasOwnProperty(m)){i=a[m],k=b[m];if(m=="className")h(b,i),h(b,this.cssClass),b[m]=j(b[m]),c&&(f[m]=b[m]);else if(m=="style"){e=k,c&&(f[m]=g={});for(d in a[m])e[d]=i[d],c&&(g[d]=e[d]);this.attrExceptions.push(m)}else b[m]=i,c&&(f[m]=b[m],l=O.hasOwnProperty(m)?O[m]:m,this.attrExceptions.push(l))}return c?f:""},hasClass:function(a){return a.nodeType==1&&c.arrayContains(this.tagNames,a.tagName.toLowerCase())&&g(a,this.cssClass)},getSelfOrAncestorWithClass:function(a){while(a){if(this.hasClass(a))return a;a=a.parentNode}return null},isModifiable:function(a){return!this.applyToEditableOnly||z(a)},isIgnorableWhiteSpaceNode:function(a){return this.ignoreWhiteSpace&&a&&a.nodeType==3&&D(a)},postApply:function(a,b,c,d){var e=a[0],f=a[a.length-1],g=[],h,i=e,j=f,k=0,l=f.length,m,n;for(var o=0,p=a.length;o<p;++o)m=a[o],n=K(m,!d),n?(h||(h=new M(n),g.push(h)),h.textNodes.push(m),m===e&&(i=h.textNodes[0],k=i.length),m===f&&(j=h.textNodes[0],l=h.getLength())):h=null;var q=L(f,!d);q&&(h||(h=new M(f),g.push(h)),h.textNodes.push(q));if(g.length){for(o=0,p=g.length;o<p;++o)g[o].doMerge(c);b.setStartAndEnd(i,k,j,l)}},createContainer:function(a){var b=a.createElement(this.elementTagName);return this.copyPropertiesToElement(this.elementProperties,b,!1),h(b,this.cssClass),b},applyToTextNode:function(a,b){var d=a.parentNode;if(d.childNodes.length==1&&this.useExistingElements&&c.arrayContains(this.tagNames,d.tagName.toLowerCase())&&v(d,this.elementProperties))h(d,this.cssClass);else{var e=this.createContainer(c.getDocument(a));a.parentNode.insertBefore(e,a),e.appendChild(a)}},isRemovable:function(a){return a.tagName.toLowerCase()==this.elementTagName&&k(a)==this.elementSortedClassName&&v(a,this.elementProperties)&&!u(a,this.attrExceptions)&&this.isModifiable(a)},isEmptyContainer:function(a){var b=a.childNodes.length;return a.nodeType==1&&this.isRemovable(a)&&(b==0||b==1&&this.isEmptyContainer(a.firstChild))},removeEmptyContainers:function(a){var b=this,c=a.getNodes([1],function(a){return b.isEmptyContainer(a)});for(var d=0,e;e=c[d++];)e.parentNode.removeChild(e)},undoToTextNode:function(a,b,c,d){if(!b.containsNode(c)){var e=b.cloneRange();e.selectNode(c),e.isPointInRange(b.endContainer,b.endOffset)&&(H(c,b.endContainer,b.endOffset,d),b.setEndAfter(c)),e.isPointInRange(b.startContainer,b.startOffset)&&(c=H(c,b.startContainer,b.startOffset,d))}this.isRemovable(c)?q(c,d):i(c,this.cssClass)},applyToRange:function(a,b){b=b||[];var c=E(b||[]);a.splitBoundariesPreservingPositions(c),this.removeEmptyElements&&this.removeEmptyContainers(a);var d=s(a);if(d.length){for(var e=0,f;f=d[e++];)!this.isIgnorableWhiteSpaceNode(f)&&!this.getSelfOrAncestorWithClass(f)&&this.isModifiable(f)&&this.applyToTextNode(f,c);f=d[d.length-1],a.setStartAndEnd(d[0],0,f,f.length),this.normalize&&this.postApply(d,a,c,!1),F(b,c)}},applyToRanges:function(a){var b=a.length;while(b--)this.applyToRange(a[b],a);return a},applyToSelection:function(b){var c=a.getSelection(b);c.setRanges(this.applyToRanges(c.getAllRanges()))},undoToRange:function(a,b){b=b||[];var c=E(b);a.splitBoundariesPreservingPositions(c),this.removeEmptyElements&&this.removeEmptyContainers(a,c);var d=s(a),e,f,g=d[d.length-1];if(d.length){for(var h=0,i=d.length;h<i;++h)e=d[h],f=this.getSelfOrAncestorWithClass(e),f&&this.isModifiable(e)&&this.undoToTextNode(e,a,f,c),a.setStartAndEnd(d[0],0,g,g.length);this.normalize&&this.postApply(d,a,c,!0),F(b,c)}},undoToRanges:function(a){var b=a.length;while(b--)this.undoToRange(a[b],a);return a},undoToSelection:function(b){var c=a.getSelection(b),d=a.getSelection(b).getAllRanges();this.undoToRanges(d),c.setRanges(d)},getTextSelectedByRange:function(a,b){var c=b.cloneRange();c.selectNodeContents(a);var d=c.intersection(b),e=d?d.toString():"";return c.detach(),e},isAppliedToRange:function(a){if(a.collapsed)return!!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);var b=a.getNodes([3]);for(var c=0,d;d=b[c++];)if(!this.isIgnorableWhiteSpaceNode(d)&&r(a,d)&&this.isModifiable(d)&&!this.getSelfOrAncestorWithClass(d))return!1;return!0},isAppliedToRanges:function(a){var b=a.length;while(b--)if(!this.isAppliedToRange(a[b]))return!1;return!0},isAppliedToSelection:function(b){var c=a.getSelection(b);return this.isAppliedToRanges(c.getAllRanges())},toggleRange:function(a){this.isAppliedToRange(a)?this.undoToRange(a):this.applyToRange(a)},toggleRanges:function(a){this.isAppliedToRanges(a)?this.undoToRanges(a):this.applyToRanges(a)},toggleSelection:function(a){this.isAppliedToSelection(a)?this.undoToSelection(a):this.applyToSelection(a)},detach:function(){}},P.util={hasClass:g,addClass:h,removeClass:i,hasSameClasses:l,replaceWithOwnChildren:q,elementsHaveSameNonClassAttributes:t,elementHasNonClassAttributes:u,splitNodeAt:H,isEditableElement:x,isEditingHost:y,isEditable:z},a.CssClassApplier=P,a.createCssClassApplier=Q})