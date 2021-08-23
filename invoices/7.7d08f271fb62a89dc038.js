(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{OC8m:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n("55Qz"),r=n("fXoL");let i=(()=>{class e{constructor(e){this.notificationsService=e}success(e,t){this.notificationsService.show(e||"",{label:t||"\u0423\u0441\u043f\u0435\u0448\u043d\u043e",status:"success",autoClose:!0,hasCloseButton:!0}).subscribe()}error(e,t){this.notificationsService.show(e||"",{label:t||"\u041e\u0448\u0438\u0431\u043a\u0430",status:"error",autoClose:!0,hasCloseButton:!0}).subscribe()}info(e,t){this.notificationsService.show(e||"",{label:t||"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f",status:"info",autoClose:!0,hasCloseButton:!0}).subscribe()}warning(e,t){this.notificationsService.show(e||"",{label:t||"\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435",status:"warning",autoClose:!0,hasCloseButton:!0}).subscribe()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275inject"](o.c))},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},gaCD:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("Cfvw"),r=n("fXoL"),i=n("I/3d"),a=n("lGQG"),s=n("OC8m");let c=(()=>{class e{constructor(e,t,n){this._fs=e,this._auth=t,this._notification=n,this.dbPath="/contractors",this.customersRef=null,this.customersExistRef=null,this.dbRef=null,this._auth.isLoggedIn&&(this.customersRef=this._fs.collection(this.dbPath,e=>e.where("_userId","==",this._auth.getUserId())))}getAll$(){return this.customersRef.valueChanges()}getById$(e){return this._fs.collection(this.dbPath,t=>t.where("_userId","==",this._auth.getUserId()).where("_id","==",e)).valueChanges()}checkExistContactorByUNP(e){return this._fs.collection(this.dbPath,t=>t.where("_userId","==",this._auth.getUserId()).where("info.unp","==",e)).valueChanges()}add$(e){const t=this._fs.createId();return e._id=t,e._userId=this._auth.getUserId(),Object(o.a)(this._fs.collection(this.dbPath).doc(t).set(JSON.parse(JSON.stringify(e))).then(()=>{this._notification.success("\u041a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d")}))}delete$(e){return Object(o.a)(this.customersRef.doc(e).delete().then(()=>{this._notification.success("\u041a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0451\u043d")}))}update(e,t){return this.customersRef.doc(e).update(t)}setContractor(e){this.selectedContractor=e}getContractor(){return this.selectedContractor}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275inject"](i.a),r["\u0275\u0275inject"](a.a),r["\u0275\u0275inject"](s.a))},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"t+Hl":function(e,t,n){"use strict";n.r(t),n.d(t,"ContractorModule",(function(){return me}));var o=n("ofXK"),r=n("3Pt+"),i=n("kqZG"),a=n("GQI6"),s=n("fXoL"),c=n("M0+2"),l=n("2Q0Y"),d=n("Gqza"),u=n("snLG"),h=n("bU3b"),p=n("6AEW");const m=function(){return{}};function g(e,t){if(1&e&&(s["\u0275\u0275element"](0,"div",1),s["\u0275\u0275pipe"](1,"async"),s["\u0275\u0275pipe"](2,"async")),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275classProp"]("message-text_light","onDark"===s["\u0275\u0275pipeBind1"](1,6,e.mode$)),s["\u0275\u0275property"]("content",e.error.message||s["\u0275\u0275pipeBind1"](2,8,e.defauleErrorMessage$))("context",e.error.context||s["\u0275\u0275pureFunction0"](10,m))("@tuiHeightCollapse",void 0)("@tuiFadeIn",void 0)}}let f=(()=>{let e=class{constructor(e,t){this.mode$=e,this.defauleErrorMessage$=t,this.error=null}};return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](h.j),s["\u0275\u0275directiveInject"](h.e))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["tui-error"]],inputs:{error:"error"},features:[s["\u0275\u0275ProvidersFeature"]([u.a])],decls:1,vars:1,consts:[["polymorpheus-outlet","","automation-id","tui-error__text","class","message-text",3,"message-text_light","content","context",4,"ngIf"],["polymorpheus-outlet","","automation-id","tui-error__text",1,"message-text",3,"content","context"]],template:function(e,t){1&e&&s["\u0275\u0275template"](0,g,3,11,"div",0),2&e&&s["\u0275\u0275property"]("ngIf",!!t.error)},directives:[o.m,p.d],pipes:[o.b],styles:["[_nghost-%COMP%]{font:var(--tui-font-text-s);color:var(--tui-text-01);display:block;color:var(--tui-negative);word-wrap:break-word}.message-text[_ngcontent-%COMP%]{margin-top:4px;white-space:pre-wrap}.message-text_light[_ngcontent-%COMP%]{color:var(--tui-negative-night)}"],data:{animation:[d.d,d.b]},changeDetection:0}),Object(a.a)([Object(l.a)()],e.prototype,"error",void 0),e})(),C=(()=>{let e=class{};return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,p.c]]}),e})();var v=n("h05a"),_=n("XNiG"),b=n("1G5W");let x=(()=>{let e=class{constructor(e,t,n,o,r,i){this.ngControl=e,this.formArrayName=t,this.formGroupName=n,this.formGroup=o,this.changeDetectorRef=r,this.validationErrors=i,this.firstError=null,this.errorsOrder=[],this.destroy$=new _.a,c.b.assert(!!this.ngControl,`NgControl not injected in ${this.constructor.name}! Use [(ngModel)] or [formControl] or formControlName for correct work.`),this.ngControl&&(this.ngControl.valueAccessor=this)}set order(e){this.errorsOrder=e,this.updateErrorText()}ngOnInit(){const e=this.control;e&&(e.asyncValidator&&e.updateValueAndValidity(),this.updateErrorText(),e.statusChanges.pipe(Object(b.a)(this.destroy$)).subscribe(()=>{this.updateErrorText()}))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}get computedError(){return this.invalid&&this.touched&&this.firstError?this.firstError:null}get invalid(){const e=this.control;return!(!e||null===e.invalid)&&e.invalid}get touched(){const e=this.control;return!(!e||null===e.touched)&&e.touched}get control(){return this.ngControl?this.ngControl.control:this.formArrayName?this.formArrayName.control:this.formGroupName?this.formGroupName.control:this.formGroup?this.formGroup.control:null}registerOnChange(){this.markForCheck()}registerOnTouched(){this.markForCheck()}setDisabledState(){this.markForCheck()}writeValue(){this.markForCheck()}get firstErrorIdByOrder(){return this.errorsOrder&&this.errorsOrder.find(e=>!!this.controlErrors[e])||null}get firstErrorId(){return Object.keys(this.controlErrors)[0]}get controlErrors(){const e=this.control;return e&&e.errors||{}}updateErrorText(){this.firstError=this.getErrorText()}getErrorText(){const e=this.firstErrorIdByOrder||this.firstErrorId,t=e&&this.controlErrors[e];return t&&(t instanceof c.a||"string"==typeof t.message)?t:e?new c.a(this.validationErrors[e],t):null}markForCheck(){this.changeDetectorRef.markForCheck()}};return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](r.NgControl,10),s["\u0275\u0275directiveInject"](r.FormArrayName,10),s["\u0275\u0275directiveInject"](r.FormGroupName,10),s["\u0275\u0275directiveInject"](r.FormGroupDirective,10),s["\u0275\u0275directiveInject"](s.ChangeDetectorRef),s["\u0275\u0275directiveInject"](v.i))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["tui-field-error"]],inputs:{order:"order"},decls:1,vars:1,consts:[[3,"error"]],template:function(e,t){1&e&&s["\u0275\u0275element"](0,"tui-error",0),2&e&&s["\u0275\u0275property"]("error",t.computedError)},directives:[f],styles:["[_nghost-%COMP%]{display:block}"],data:{animation:[d.d,d.b]}}),Object(a.a)([Object(l.c)()],e.prototype,"order",null),e})(),y=(()=>{let e=class{};return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,r.ReactiveFormsModule,C]]}),e})();var O=n("m1/c"),w=n("akRu"),k=n("qRik"),P=n("7iOb"),M=n("4TLE"),E=n("PIpu"),I=n("LenD"),S=n("2aHb"),j=n("lD5H");let F=(()=>{let e=class{constructor(e,t){this.element=e,this.renderer=t,this.tuiCheckedChange=new s.EventEmitter,this.updateProperty("checked",!1)}set tuiChecked(e){this.updateProperty("checked",e||!1),this.updateProperty("indeterminate",null===e)}onChange({checked:e}){this.updateProperty("indeterminate",!1),this.tuiCheckedChange.emit(e)}updateProperty(e,t){this.renderer.setProperty(this.element.nativeElement,e,t)}};return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](s.ElementRef),s["\u0275\u0275directiveInject"](s.Renderer2))},e.\u0275dir=s["\u0275\u0275defineDirective"]({type:e,selectors:[["input","tuiChecked",""],["input","tuiCheckedChange",""]],hostBindings:function(e,t){1&e&&s["\u0275\u0275listener"]("change",(function(e){return t.onChange(e.target)}))},inputs:{tuiChecked:"tuiChecked"},outputs:{tuiCheckedChange:"tuiCheckedChange"}}),e})(),z=(()=>{let e=class{};return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)}}),e})();var N=n("hPTC"),L=n("l4e0"),D=n("jzak"),G=n("yPFk");const V=["focusableElement"];function B(e,t){if(1&e&&s["\u0275\u0275element"](0,"tui-loader",8),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275property"]("size",e.loaderSize)("inheritColor",!0)("showLoader",e.checked)}}function R(e,t){if(1&e&&s["\u0275\u0275element"](0,"tui-svg",9),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275property"]("src",e.iconOn)}}function T(e,t){if(1&e&&s["\u0275\u0275element"](0,"tui-loader",8),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275property"]("size",e.loaderSize)("inheritColor",!0)("showLoader",!e.checked)}}function A(e,t){if(1&e&&s["\u0275\u0275element"](0,"tui-svg",10),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275property"]("src",e.iconOff)}}var $;let H=(()=>{let e=$=class extends w.a{constructor(e,t,n){super(e,t),this.modeDirective=n,this.singleColor=!1,this.showIcons=!1,this.showLoader=!1,this.size="m"}get nativeFocusableElement(){return this.focusableElement?this.focusableElement.nativeElement:null}get focused(){return Object(k.d)(this.nativeFocusableElement)}get appearance(){return this.singleColor||this.checked?"primary":"secondary"}get sizeM(){return"m"===this.size}get checked(){return this.value}get iconOn(){return this.sizeM?"tuiIconToggleOn":"tuiIconToggleOnLarge"}get iconOff(){return this.sizeM?"tuiIconToggleOff":"tuiIconToggleOffLarge"}get loaderSize(){return this.sizeM?"xs":"s"}get hostMode(){return this.modeDirective?this.modeDirective.mode:null}onChecked(e){this.updateValue(e)}onFocused(e){this.updateFocused(e)}onHovered(e){this.updateHovered(e)}onPressed(e){this.updatePressed(e)}onFocusVisible(e){this.updateFocusVisible(e)}getFallbackValue(){return!1}};return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](r.NgControl,10),s["\u0275\u0275directiveInject"](s.ChangeDetectorRef),s["\u0275\u0275directiveInject"](N.a,8))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["tui-toggle"]],viewQuery:function(e,t){var n;1&e&&s["\u0275\u0275viewQuery"](V,!0),2&e&&s["\u0275\u0275queryRefresh"](n=s["\u0275\u0275loadQuery"]())&&(t.focusableElement=n.first)},hostVars:4,hostBindings:function(e,t){2&e&&(s["\u0275\u0275attribute"]("data-tui-host-size",t.size)("data-mode",t.hostMode),s["\u0275\u0275classProp"]("_checked",t.checked))},inputs:{singleColor:"singleColor",showIcons:"showIcons",showLoader:"showLoader",size:"size"},features:[s["\u0275\u0275ProvidersFeature"]([{provide:P.c,useExisting:Object(s.forwardRef)(()=>$)}]),s["\u0275\u0275InheritDefinitionFeature"]],decls:9,vars:15,consts:[[3,"appearance","disabled","focused","hovered","pressed","invalid"],[1,"toggle"],["class","loader",3,"size","inheritColor","showLoader",4,"ngIf"],["class","icon","automation-id","tui-toggle__check-icon",3,"src",4,"ngIf"],[1,"circle"],["class","icon icon_off","automation-id","tui-toggle__cancel-icon",3,"src",4,"ngIf"],["type","checkbox","role","switch","automation-id","tui-toggle__checkbox",1,"checkbox",3,"id","disabled","tuiChecked","tuiFocusable","tuiCheckedChange","tuiFocusedChange","tuiHoveredChange","tuiPressedChange","tuiFocusVisibleChange"],["focusableElement",""],[1,"loader",3,"size","inheritColor","showLoader"],["automation-id","tui-toggle__check-icon",1,"icon",3,"src"],["automation-id","tui-toggle__cancel-icon",1,"icon","icon_off",3,"src"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"tui-wrapper",0),s["\u0275\u0275elementStart"](1,"div",1),s["\u0275\u0275template"](2,B,1,3,"tui-loader",2),s["\u0275\u0275template"](3,R,1,1,"tui-svg",3),s["\u0275\u0275element"](4,"div",4),s["\u0275\u0275template"](5,T,1,3,"tui-loader",2),s["\u0275\u0275template"](6,A,1,1,"tui-svg",5),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"input",6,7),s["\u0275\u0275listener"]("tuiCheckedChange",(function(e){return t.onChecked(e)}))("tuiFocusedChange",(function(e){return t.onFocused(e)}))("tuiHoveredChange",(function(e){return t.onHovered(e)}))("tuiPressedChange",(function(e){return t.onPressed(e)}))("tuiFocusVisibleChange",(function(e){return t.onFocusVisible(e)})),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("appearance",t.appearance)("disabled",t.disabled)("focused",t.computedFocusVisible)("hovered",t.computedHovered)("pressed",t.computedPressed)("invalid",t.computedInvalid),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("ngIf",t.showLoader),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.showIcons&&!t.showLoader),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("ngIf",t.showLoader),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.showIcons&&!t.showLoader),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("id",t.id)("disabled",t.disabled)("tuiChecked",t.checked)("tuiFocusable",t.focusable),s["\u0275\u0275attribute"]("aria-checked",t.value))},directives:[L.a,o.m,F,E.a,M.a,I.a,S.a,j.a,G.a,D.a],styles:["[_nghost-%COMP%]{position:relative;display:inline-block;vertical-align:middle;overflow:hidden;border-radius:100px}[data-tui-host-size='m'][_nghost-%COMP%]{width:32px;height:16px}[data-tui-host-size='l'][_nghost-%COMP%]{width:48px;height:24px}.checkbox[_ngcontent-%COMP%]{padding:0;border:0;border-radius:inherit;background:0 0;font-size:inherit;line-height:inherit;font-weight:inherit;color:inherit;caret-color:currentColor;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;word-break:keep-all;-webkit-text-fill-color:currentColor;position:absolute;top:0;left:0;height:100%;width:100%;opacity:0;cursor:pointer}.checkbox[_ngcontent-%COMP%]:-webkit-autofill, .checkbox[_ngcontent-%COMP%]:-webkit-autofill:focus, .checkbox[_ngcontent-%COMP%]:-webkit-autofill:hover{border-radius:inherit;-webkit-text-fill-color:inherit!important;color:inherit!important;background-color:transparent!important;-webkit-box-shadow:0 0 0 1000px var(--tui-autofill) inset!important}._disabled[_nghost-%COMP%]   .checkbox[_ngcontent-%COMP%]{pointer-events:none;cursor:default}.toggle[_ngcontent-%COMP%]{transition-property:transform;transition-duration:.3s;transition-timing-function:ease-in-out;display:flex;align-items:center;justify-content:center}[data-tui-host-size='m'][_nghost-%COMP%]   .toggle[_ngcontent-%COMP%]{width:48px;height:16px;transform:translateX(-16px)}[data-tui-host-size='l'][_nghost-%COMP%]   .toggle[_ngcontent-%COMP%]{width:72px;height:24px;transform:translateX(-24px)}._checked[_nghost-%COMP%]   .toggle[_ngcontent-%COMP%]{transform:translateX(0)}.circle[_ngcontent-%COMP%]{margin:2px 0;flex-shrink:0;border-radius:100%;background-color:var(--tui-base-01)}._disabled[_nghost-%COMP%]   .circle_light[_ngcontent-%COMP%]{opacity:.24}[data-tui-host-size='m'][_nghost-%COMP%]   .circle[_ngcontent-%COMP%]{width:12px;height:12px}[data-tui-host-size='l'][_nghost-%COMP%]   .circle[_ngcontent-%COMP%]{width:16px;height:16px}._disabled[_nghost-%COMP%]   .circle[_ngcontent-%COMP%]{background-color:var(--tui-base-01)}[_nghost-%COMP%]:not(._checked)   .loader[_ngcontent-%COMP%]{color:var(--tui-base-06)}[_nghost-%COMP%]:not(._checked)._disabled   .loader[_ngcontent-%COMP%]{color:var(--tui-base-05)}[_nghost-%COMP%]:not(._checked)[data-mode=onDark]   .loader[_ngcontent-%COMP%]{color:var(--tui-text-03-night)}[_nghost-%COMP%]:not(._checked)[data-mode=onDark]._disabled   .loader[_ngcontent-%COMP%]{color:var(--tui-clear-inverse-active)}[_nghost-%COMP%]:not(._checked)[data-mode=onLight]   .loader[_ngcontent-%COMP%]{color:var(--tui-text-03)}[_nghost-%COMP%]:not(._checked)[data-mode=onLight]._disabled   .loader[_ngcontent-%COMP%]{color:var(--tui-clear-active)}[data-tui-host-size='m'][_nghost-%COMP%]   .loader[_ngcontent-%COMP%]{width:12px;margin:0 2px;transform:scale(.75)}[data-tui-host-size='l'][_nghost-%COMP%]   .loader[_ngcontent-%COMP%]{width:16px;margin:0 6px}.icon[_ngcontent-%COMP%]{opacity:.8}.icon_off[_ngcontent-%COMP%]{color:var(--tui-base-06)}._disabled[_nghost-%COMP%]   .icon_off[_ngcontent-%COMP%]{color:var(--tui-base-05)}[data-mode=onDark][_nghost-%COMP%]   .icon_off[_ngcontent-%COMP%]{color:var(--tui-text-03-night)}[data-mode=onDark]._disabled[_nghost-%COMP%]   .icon_off[_ngcontent-%COMP%]{color:var(--tui-clear-inverse-active)}[data-mode=onLight][_nghost-%COMP%]   .icon_off[_ngcontent-%COMP%]{color:var(--tui-text-03)}[data-mode=onLight]._disabled[_nghost-%COMP%]   .icon_off[_ngcontent-%COMP%]{color:var(--tui-clear-active)}[data-tui-host-size='m'][_nghost-%COMP%]   .icon[_ngcontent-%COMP%]{width:16px;height:16px;transform:scale(.75)}[data-tui-host-size='l'][_nghost-%COMP%]   .icon[_ngcontent-%COMP%]{margin:0 2px;width:24px;height:24px}._hovered[_nghost-%COMP%]   .icon[_ngcontent-%COMP%]{opacity:1}"],changeDetection:0}),Object(a.a)([Object(l.a)()],e.prototype,"singleColor",void 0),Object(a.a)([Object(l.a)()],e.prototype,"showIcons",void 0),Object(a.a)([Object(l.a)()],e.prototype,"showLoader",void 0),Object(a.a)([Object(l.a)()],e.prototype,"size",void 0),e})(),q=(()=>{let e=class{};return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,M.b,E.b,I.b,S.b,j.b,z,L.b,D.b,G.b]]}),e})();var U=n("q9Vr"),X=n("tyNb"),Q=n("I/3d"),J=n("gaCD"),W=n("904P"),K=n("NEux");let Y=(()=>{class e{constructor(e,t,n){this.afs=e,this.formBuilder=t,this.contractorService=n,this.close=new s.EventEmitter,this.maskUNP={guide:!1,modelClean:!0,mask:[/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/]}}ngOnInit(){this.setupForm(),this.form.valueChanges.subscribe(e=>{e.info.unp=e.info.unp.replace(/\D+/g,"")})}setupForm(){this.form=this.formBuilder.group({_id:new r.FormControl(this.afs.createId(),[r.Validators.required]),info:new r.FormGroup({fullName:new r.FormControl(null,[r.Validators.required]),fullNameBel:new r.FormControl(null),name:new r.FormControl(null,[r.Validators.required]),nameBel:new r.FormControl(null),registrationDate:new r.FormControl(null),shortName:new r.FormControl(null,[r.Validators.required]),shortNameBel:new r.FormControl(null),unp:new r.FormControl(null,[r.Validators.required,r.Validators.minLength(11),r.Validators.maxLength(11)])}),juridicalAddress:new r.FormGroup({}),mailingAddress:new r.FormControl({})})}save(){this.contractorService.add$(this.form.value).subscribe(()=>{this.cancel()})}cancel(){this.close.emit(!0)}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](Q.a),s["\u0275\u0275directiveInject"](r.FormBuilder),s["\u0275\u0275directiveInject"](J.a))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-contractor-create"]],outputs:{close:"close"},decls:40,vars:8,consts:[[3,"formGroup"],["formGroupName","info"],[1,"tui-space_top-10"],["formControlName","unp",3,"textMask"],["formControlName","unp"],["formControlName","fullName"],["formControlName","shortName"],["formControlName","name"],["formGroupName","juridicalAddress"],["formGroupName","mailingAddress"],["size","l",1,"tui-space_left-1",3,"showIcons"],["tuiButton","","type","button","appearance","secondary",1,"tui-space_right-3",3,"showLoader","size","click"],["tuiButton","","type","button",3,"showLoader","size","disabled","click"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"form",0),s["\u0275\u0275elementStart"](1,"h2"),s["\u0275\u0275text"](2,"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0430"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](3,"section",1),s["\u0275\u0275elementStart"](4,"h3",2),s["\u0275\u0275text"](5,"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](6,"p"),s["\u0275\u0275elementStart"](7,"tui-input",3),s["\u0275\u0275text"](8," \u0423\u041d\u041f "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](9,"tui-field-error",4),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"p"),s["\u0275\u0275elementStart"](11,"tui-input",5),s["\u0275\u0275text"](12," \u041f\u043e\u043b\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](13,"tui-field-error",5),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](14,"p"),s["\u0275\u0275elementStart"](15,"tui-input",6),s["\u0275\u0275text"](16," \u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](17,"tui-field-error",6),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](18,"p"),s["\u0275\u0275elementStart"](19,"tui-input",7),s["\u0275\u0275text"](20," \u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](21,"tui-field-error",7),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](22,"section",8),s["\u0275\u0275elementStart"](23,"h3",2),s["\u0275\u0275text"](24,"\u042e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](25,"p"),s["\u0275\u0275text"](26,"123123123"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](27,"section",9),s["\u0275\u0275elementStart"](28,"h3",2),s["\u0275\u0275text"](29,"\u041f\u043e\u0447\u0442\u043e\u0432\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](30,"p"),s["\u0275\u0275text"](31," \u0418\u0434\u0435\u043d\u0442\u0438\u0447\u043d\u044b\u0435 \u044e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u0434\u0430\u043d\u043d\u044b\u043c "),s["\u0275\u0275element"](32,"tui-toggle",10),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](33,"p"),s["\u0275\u0275text"](34,"123123123"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](35,"section"),s["\u0275\u0275elementStart"](36,"button",11),s["\u0275\u0275listener"]("click",(function(){return t.cancel()})),s["\u0275\u0275text"](37," \u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](38,"button",12),s["\u0275\u0275listener"]("click",(function(){return t.save()})),s["\u0275\u0275text"](39," \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("formGroup",t.form),s["\u0275\u0275advance"](7),s["\u0275\u0275property"]("textMask",t.maskUNP),s["\u0275\u0275advance"](25),s["\u0275\u0275property"]("showIcons",!0),s["\u0275\u0275advance"](4),s["\u0275\u0275property"]("showLoader",!1)("size","m"),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("showLoader",!1)("size","m")("disabled",t.form.invalid))},directives:[r["\u0275angular_packages_forms_forms_y"],r.NgControlStatusGroup,r.FormGroupDirective,r.FormGroupName,O.a,r.NgControlStatus,r.FormControlName,W.MaskedInputDirective,x,H,K.a],styles:[""]}),e})();var Z=n("AytR"),ee=n("+Co2");function te(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"th",16),s["\u0275\u0275text"](1,"\u0423\u041d\u041f"),s["\u0275\u0275elementEnd"]()),2&e&&s["\u0275\u0275property"]("resizable",!0)}function ne(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"th",16),s["\u0275\u0275text"](1,"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435"),s["\u0275\u0275elementEnd"]()),2&e&&s["\u0275\u0275property"]("resizable",!0)}function oe(e,t){1&e&&s["\u0275\u0275element"](0,"th",16),2&e&&s["\u0275\u0275property"]("resizable",!1)}function re(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"td",19),s["\u0275\u0275text"](1),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]().$implicit;s["\u0275\u0275advance"](1),s["\u0275\u0275textInterpolate1"](" ",null==e||null==e.info?null:e.info.unp," ")}}function ie(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"td",19),s["\u0275\u0275text"](1),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]().$implicit;s["\u0275\u0275advance"](1),s["\u0275\u0275textInterpolate1"](" ",null==e||null==e.info?null:e.info.shortName," ")}}function ae(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"td",19),s["\u0275\u0275elementStart"](1,"button",20),s["\u0275\u0275listener"]("click",(function(){s["\u0275\u0275restoreView"](e);const t=s["\u0275\u0275nextContext"]().$implicit;return s["\u0275\u0275nextContext"](2).delete(t)})),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}function se(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"tr",17),s["\u0275\u0275template"](1,re,2,1,"td",18),s["\u0275\u0275template"](2,ie,2,1,"td",18),s["\u0275\u0275template"](3,ae,2,0,"td",18),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiCell","unp"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiCell","name"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiCell","action"))}function ce(e,t){if(1&e&&(s["\u0275\u0275elementContainerStart"](0),s["\u0275\u0275elementStart"](1,"table",11),s["\u0275\u0275elementStart"](2,"thead"),s["\u0275\u0275elementStart"](3,"tr",12),s["\u0275\u0275template"](4,te,2,1,"th",13),s["\u0275\u0275template"](5,ne,2,1,"th",13),s["\u0275\u0275template"](6,oe,1,1,"th",13),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"tbody",14),s["\u0275\u0275template"](8,se,4,3,"tr",15),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementContainerEnd"]()),2&e){const e=t.ngIf,n=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("columns",n.columns),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("tuiHead","unp"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiHead","name"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiHead","action"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("data",e),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("tuiRowOf",e)}}function le(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"aside",21),s["\u0275\u0275elementStart"](1,"app-contractor-create",22),s["\u0275\u0275listener"]("close",(function(){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().toggleAsideContractorCreate()})),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}const de=[{path:"",component:(()=>{class e{constructor(e){this.contractorService=e,this.columns=["unp","name","action"],this.routing=Z.a.routing}ngOnInit(){this.fetch()}fetch(){this.contractors$=this.contractorService.getAll$()}delete(e){e&&this.contractorService.delete$(e._id)}toggleAsideContractorCreate(){this.isOpenAsideContractorCreate=!this.isOpenAsideContractorCreate}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](J.a))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-contractor-list"]],decls:14,vars:5,consts:[[1,"header"],[1,"header__top"],[1,"header__account"],["text","\u0420\u043e\u043c\u0430\u043d \u041b\u0443\u043d\u0446\u0435\u0432\u0438\u0447","size","m",1,"tui-space_right-3",3,"rounded"],[1,"header__account-name"],[1,"tui-text_h6"],[1,"tui-text_body-s"],[1,"header__action"],["tuiIconButton","","size","m","icon","tuiIconPlusLarge","title","Add new invoice","shape","rounded",1,"tui-space_left-10",3,"click"],[4,"ngIf"],["class","aside _right _close",4,"ngIf"],["tuiTable","",3,"columns"],["tuiThGroup",""],["tuiTh","",3,"resizable",4,"tuiHead"],["tuiTbody","",3,"data"],["tuiTr","",4,"tuiRow","tuiRowOf"],["tuiTh","",3,"resizable"],["tuiTr",""],["tuiTd","",4,"tuiCell"],["tuiTd",""],["tuiIconButton","","appearance","flat","size","s","icon","tuiIconTrash","title","\u0423\u0434\u0430\u043b\u0438\u0442\u044c","shape","rounded",3,"click"],[1,"aside","_right","_close"],[3,"close"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",0),s["\u0275\u0275elementStart"](1,"div",1),s["\u0275\u0275elementStart"](2,"div",2),s["\u0275\u0275element"](3,"tui-avatar",3),s["\u0275\u0275elementStart"](4,"div",4),s["\u0275\u0275elementStart"](5,"span",5),s["\u0275\u0275text"](6,"\u0418\u041f \u041b\u0443\u043d\u0446\u0435\u0432\u0438\u0447 \u0420.\u0412."),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"span",6),s["\u0275\u0275text"](8,"\u0423\u041d\u041f: 123 123 123"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"div",7),s["\u0275\u0275elementStart"](10,"button",8),s["\u0275\u0275listener"]("click",(function(){return t.toggleAsideContractorCreate()})),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275template"](11,ce,9,6,"ng-container",9),s["\u0275\u0275pipe"](12,"async"),s["\u0275\u0275template"](13,le,2,0,"aside",10)),2&e&&(s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("rounded",!0),s["\u0275\u0275advance"](8),s["\u0275\u0275property"]("ngIf",s["\u0275\u0275pipeBind1"](12,3,t.contractors$)),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("ngIf",t.isOpenAsideContractorCreate))},directives:[i.a,K.a,o.m,ee.d,ee.i,ee.b,ee.f,ee.c,ee.h,ee.j,ee.a,ee.g,Y],pipes:[o.b],styles:[".header[_ngcontent-%COMP%]{position:sticky;height:80px;margin:-15px -15px 15px;padding:15px;border-bottom:1px solid var(--color-graphite)}.header[_ngcontent-%COMP%]   .header__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.header[_ngcontent-%COMP%]   .header__account[_ngcontent-%COMP%]{display:inline-flex;align-items:center}.header[_ngcontent-%COMP%]   .header__account-name[_ngcontent-%COMP%]{display:inline-flex;flex-direction:column}.header[_ngcontent-%COMP%]   .header__action[_ngcontent-%COMP%]{display:inline-flex;align-items:center}.header[_ngcontent-%COMP%]   .header__action-balance[_ngcontent-%COMP%]{display:inline-flex;flex-direction:column;align-items:flex-end}table[_ngcontent-%COMP%]{width:100%}.aside[_ngcontent-%COMP%]{position:fixed;right:15px;top:15px;bottom:15px;width:400px;border-radius:10px;background:#fff;z-index:100;padding:15px;box-shadow:0 0 30px 10px hsla(0,0%,41.2%,.2)}"]}),e})()},{path:"create",component:Y}];let ue=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[X.f.forChild(de)],X.f]}),e})();var he=n("Ne87"),pe=n("PCNd");let me=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,pe.a,r.FormsModule,r.ReactiveFormsModule,ue,i.b,K.b,K.b,y,he.d,O.b,U.b,q]]}),e})()}}]);