import React, { useState } from "react";

// ── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  navy:"#0D1B2A", teal:"#1D9E75", tealBg:"#E1F5EE",
  amber:"#BA7517", amberBg:"#FAEEDA",
  red:"#A32D2D", redBg:"#FCEBEB",
  green:"#3B6D11", greenBg:"#EAF3DE",
  purple:"#534AB7", purpleBg:"#EEEDFE",
  blue:"#185FA5", blueBg:"#E6F1FB",
  surf:"var(--color-background-secondary)",
  bdr:"var(--color-border-tertiary)",
  muted:"var(--color-text-secondary)",
  textSub:"var(--color-text-secondary)",
  text:"var(--color-text-primary)",
  bg:"var(--color-background-tertiary)",
  white:"var(--color-background-primary)",
  line:"#06C755", linedk:"#075E54",
};

// ── Static Data ───────────────────────────────────────────────────────────────
const CUSTS_INIT_DEMO = [
  {id:1,name:"คุณสมชาย",biz:"ABC Trading",type:"monthly",svc:"บัญชีรายเดือนนิติบุคคล",status:"B",price:4000,src:"Facebook",by:"แมน",paid:true,docRisk:false,pipe:"ลูกค้าปัจจุบัน",bizType:"SME",concern:"กลัวยื่นภาษีเอง"},
  {id:2,name:"คุณวิภา",biz:"ร้านวิภาขนม",type:"annual",svc:"ยื่นภาษีรายปี",status:"A",price:0,src:"TikTok",by:"-",paid:false,docRisk:true,pipe:"รอเอกสาร",bizType:"บุคคลธรรมดา",concern:"ราคาแพง"},
  {id:3,name:"คุณประสิทธิ์",biz:"PS Logistics",type:"monthly",svc:"ปิดงบ (ผู้สอบบัญชี)",status:"B",price:12000,src:"Referral",by:"แมน",paid:true,docRisk:true,pipe:"ลูกค้าปัจจุบัน",bizType:"SME",concern:""},
  {id:4,name:"คุณเพชร",biz:"Diamond Property",type:"company",svc:"จดบริษัท",status:"C",price:8500,src:"Line OA",by:"พิม",paid:true,docRisk:false,pipe:"กลับมาซ้ำ",bizType:"บริษัทขนาดกลาง",concern:""},
  {id:5,name:"คุณธนา",biz:"TN Import",type:"company",svc:"จด หจก",status:"D",price:0,src:"Google",by:"-",paid:false,docRisk:false,pipe:"ตามเก่า",bizType:"SME",concern:"ราคาสูง"},
  {id:6,name:"คุณนิภา",biz:"NP Beauty",type:"annual",svc:"ยื่นภาษีรายปี",status:"B",price:3000,src:"Instagram",by:"พิม",paid:true,docRisk:false,pipe:"ลูกค้าปัจจุบัน",bizType:"บุคคลธรรมดา",concern:""},
  {id:7,name:"คุณอรุณ",biz:"Sunrise Café",type:"monthly",svc:"บัญชีรายเดือนบุคคล",status:"A",price:0,src:"Facebook",by:"แมน",paid:false,docRisk:false,pipe:"รอโทร",bizType:"SME",concern:""},
];
const SM = {
  A:{l:"สอบถามใหม่",c:C.amber,bg:C.amberBg},
  B:{l:"ลูกค้าปัจจุบัน",c:C.green,bg:C.greenBg},
  C:{l:"กลับมาซ้ำ",c:C.purple,bg:C.purpleBg},
  D:{l:"หายไป >90วัน",c:C.red,bg:C.redBg},
};
const TM = {
  monthly:{l:"ทำรายเดือน",c:C.teal,bg:C.tealBg},
  company:{l:"จดบริษัท/หจก",c:C.purple,bg:C.purpleBg},
  annual:{l:"ยื่นภาษีรายปี",c:C.amber,bg:C.amberBg},
};
const SALESPEOPLE = [
  {name:"แมน",c:C.teal,targets:[{l:"บัญชีรายเดือน",d:50,t:500},{l:"ยื่นภาษีรายปี",d:74,t:300},{l:"จดบริษัท",d:28,t:105}]},
  {name:"พิม",c:C.purple,targets:[{l:"บัญชีรายเดือน",d:112,t:400},{l:"บัญชีบุคคล",d:67,t:200},{l:"จด หจก",d:22,t:80}]},
];
const CHURN_DATA = [
  {name:"คุณธนา",svc:"จด หจก",reason:"ราคาสูง",month:"มิ.ย."},
  {name:"คุณอ้อ",svc:"บัญชีรายเดือน",reason:"ติดต่อยาก",month:"พ.ค."},
  {name:"คุณบอย",svc:"วางแผนภาษี",reason:"ราคาสูง",month:"พ.ค."},
  {name:"คุณมาย",svc:"จดบริษัท",reason:"เปลี่ยนใจ",month:"เม.ย."},
  {name:"คุณปาล์ม",svc:"บัญชีรายเดือน",reason:"ติดต่อยาก",month:"เม.ย."},
];
const SVCS = [
  "บัญชีรายเดือนนิติบุคคล","บัญชีรายเดือนบุคคล","ปิดงบ (ผู้สอบบัญชี)",
  "บัญชีภายใน","ออดิตตรวจนับคลัง","วางระบบบัญชี","ยื่นภาษีรายปี",
  "จดบริษัท","จด หจก","ปิดบริษัท","ทำวีซ่า","รับเปิด Holding",
];
const DOCS_LIST = ["หนังสือรับรอง","ภ.พ.20","บัตรประชาชน","สำเนาทะเบียนพาณิชย์","งบการเงิน","เดินบัญชี"];
const PIPE_COLS = [
  {key:"นัดคุย",c:"#378ADD"},{key:"รอโทร",c:C.amber},{key:"รอตัดสินใจ",c:C.purple},
  {key:"รอเอกสาร",c:C.red},{key:"ลูกค้าปัจจุบัน",c:C.green},
  {key:"กลับมาซ้ำ",c:C.teal},{key:"ตามเก่า",c:"#888780"},
];
const PENDING_JOBS_INIT = [
  {id:1,name:"คุณวิภา",biz:"ร้านวิภาขนม",type:"annual",formType:"ยื่นภาษีบุคคลธรรมดา",by:"แมน",status:"pending",summary:"ยื่นภาษีรายปี · TikTok · ยังไม่ชำระ"},
  {id:2,name:"คุณธนา",biz:"TN Import Export",type:"company",formType:"จดบริษัทใหม่",by:"พิม",status:"pending",summary:"จด หจก · Google · ยังไม่ชำระ"},
  {id:3,name:"คุณเพชร",biz:"Diamond Property",type:"company",formType:"จดบริษัทใหม่",by:"พิม",status:"done",summary:"จดบริษัท · Line OA · ชำระแล้ว"},
];
const ACCT_CHATS_BY_CUST = {
  0:[
    {from:"ai",text:"สวัสดีค่ะ คุณสมชาย 😊\n\n🔔 กำหนดส่งเอกสาร ภ.พ.30 เหลืออีก 7 วัน (ภายใน 15 ก.ค. 2569)\n\nรายการที่ต้องส่งค่ะ:\n• รายการเดินบัญชีเดือน มิ.ย.\n• ใบกำกับภาษีซื้อ (ถ้ามี)\n\nส่งมาทาง LINE นี้ได้เลยนะคะ 📄"},
    {from:"cust",text:"โอเคค่ะ ส่งใบเสร็จค่าน้ำมันมาก่อนนะคะ [📷 รูปภาพ]"},
    {from:"ai",text:"✅ รับเอกสารแล้วค่ะ คุณสมชาย!\n\n📌 ใบเสร็จ / ค่าน้ำมัน\n📅 10 มิ.ย. 2569  💰 ฿2,450 (ปตท. บางนา)\n\nทีมบัญชีจะตรวจสอบและบันทึกให้นะคะ 🙏"},
    {from:"cust",text:"เดือนนี้ต้องส่งอะไรเพิ่มบ้างคะ?"},
    {from:"acct",text:"สวัสดีค่ะ คุณสมชาย น้องบีค่ะ 😊\n\nที่ยังขาดอยู่ค่ะ:\n• รายการเดินบัญชี มิ.ย. (ยังไม่ได้รับ)\n• ใบกำกับภาษีซื้อเพิ่มเติม (ถ้ามี)\n\n⏰ ขอภายใน 15 ก.ค. นะคะ ส่งมาได้เลยค่ะ 📎"},
  ],
  1:[
    {from:"ai",text:"สวัสดีค่ะ คุณนิภา 😊\n\n🔔 กำหนดยื่นภาษีบุคคลธรรมดา ปี 2568\nภายใน 31 มี.ค. 2569 (เหลือ 45 วัน)\n\nเอกสารที่ต้องรวบรวมค่ะ:\n• หนังสือรับรองเงินเดือน (50ทวิ)\n• รายการลดหย่อนต่างๆ\n\nมีคำถามถามทีมบัญชีได้เลยนะคะ 📋"},
    {from:"cust",text:"ปีนี้มีประกันชีวิตด้วยค่ะ ลดหย่อนได้มั้ยคะ?"},
    {from:"acct",text:"ได้เลยค่ะ คุณนิภา ประกันชีวิตลดหย่อนได้สูงสุด 100,000 บาทค่ะ\n\nขอเอกสารด้วยนะคะ:\n• หน้ากรมธรรม์\n• ใบเสร็จชำระค่าเบี้ยประกัน\n\nส่งมาทาง LINE นี้ได้เลยค่ะ 😊"},
  ],
  2:[
    {from:"ai",text:"สวัสดีค่ะ คุณเพชร 😊\n\n🔔 อัปเดตสถานะจดบริษัท Diamond Property\n\n✅ จองชื่อบริษัท\n✅ รับรองลายมือชื่อ\n⏳ รอกรมพัฒนาธุรกิจอนุมัติ (3-5 วันทำการ)\n\nทีมจะแจ้งทันทีที่มีความคืบหน้านะคะ"},
    {from:"cust",text:"แล้ว VAT ต้องจดด้วยมั้ยคะ?"},
    {from:"acct",text:"ขึ้นอยู่กับรายได้ค่ะ\n\n• รายได้เกิน 1.8 ล้าน/ปี → จด VAT บังคับค่ะ\n• ไม่เกิน → ไม่จดก็ได้ แต่จดไว้มีประโยชน์ถ้าขายให้นิติบุคคล\n\nอยากให้ช่วยวางแผนเพิ่มเติมได้เลยนะคะ 😊"},
  ],
};

// ── Utils ─────────────────────────────────────────────────────────────────────
const pct = (d,t) => t ? Math.min(100,Math.round(d/t*100)) : 0;

// ── Base UI components ────────────────────────────────────────────────────────
function Pill({children,c,bg,style={}}){
  return <span style={{background:bg,color:c,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:600,whiteSpace:"nowrap",display:"inline-block",letterSpacing:.2,...style}}>{children}</span>;
}
function Card({children,style={}}){
  return <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.bdr}`,padding:18,marginBottom:12,boxShadow:"0 1px 4px rgba(108,92,231,.06)",...style}}>{children}</div>;
}
function CTitle({children,sub}){
  return(
    <div style={{marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:C.text}}>{children}</div>
      {sub && <div style={{fontSize:11,color:C.muted,marginTop:2}}>{sub}</div>}
    </div>
  );
}
function BarRow({label,val,total,color,lw=80}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
      <span style={{fontSize:12,color,minWidth:lw,fontWeight:600}}>{label}</span>
      <div style={{flex:1,height:7,background:"var(--color-background-secondary)",borderRadius:4,overflow:"hidden"}}>
        <div style={{width:`${pct(val,total)}%`,height:"100%",background:color,borderRadius:3,transition:"width .3s"}}/>
      </div>
      <b style={{fontSize:13,color:"var(--color-text-primary)",minWidth:24,textAlign:"right"}}>{val}</b>
    </div>
  );
}
function FLabel({t,req}){ return <label style={{fontSize:10,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:3,display:"block"}}>{t}{req&&<span style={{color:C.red}}> *</span>}</label>; }
function FInput({label,value,onChange,placeholder,type="text",req=false}){
  return(
    <div style={{marginBottom:8}}>
      <FLabel t={label} req={req}/>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:"100%",border:`0.5px solid ${C.bdr}`,borderRadius:7,padding:"6px 9px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white,color:"var(--color-text-primary)",boxSizing:"border-box"}}/>
    </div>
  );
}
function FTextarea({label,value,onChange,placeholder,rows=2}){
  return(
    <div style={{marginBottom:8}}>
      <FLabel t={label}/>
      <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{width:"100%",border:`0.5px solid ${C.bdr}`,borderRadius:7,padding:"6px 9px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white,color:"var(--color-text-primary)",boxSizing:"border-box",resize:"vertical"}}/>
    </div>
  );
}
function FRadio({label,opts,value,onChange}){
  return(
    <div style={{marginBottom:8}}>
      <FLabel t={label}/>
      <div style={{display:"flex",gap:6}}>
        {opts.map(o=>(
          <button key={o} onClick={()=>onChange(o)} style={{flex:1,border:`0.5px solid ${value===o?C.line:C.bdr}`,borderRadius:7,padding:"6px 4px",fontSize:11,cursor:"pointer",background:value===o?"#E8F5E9":"var(--color-background-secondary)",color:value===o?"#1B5E20":"var(--color-text-primary)",fontFamily:"inherit",fontWeight:value===o?500:400}}>{o}</button>
        ))}
      </div>
    </div>
  );
}
function FCheck({label,checked,onChange}){
  return(
    <label style={{display:"flex",alignItems:"flex-start",gap:7,fontSize:12,cursor:"pointer",marginBottom:6,color:"var(--color-text-primary)",lineHeight:1.4}}>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} style={{accentColor:C.line,marginTop:2,flexShrink:0}}/>{label}
    </label>
  );
}
function SectionLabel({children}){
  return <div style={{fontSize:10,fontWeight:500,color:"#fff",background:C.navy,borderRadius:5,padding:"3px 9px",margin:"12px 0 7px",display:"block"}}>{children}</div>;
}
function StepBar({step,total}){
  return(
    <div style={{display:"flex",gap:4,marginBottom:12}}>
      {Array.from({length:total}).map((_,i)=>(
        <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<step?C.line:"#DDD",transition:"background .2s"}}/>
      ))}
    </div>
  );
}
function BtnRow({onBack,onNext,nextLabel="ถัดไป →"}){
  return(
    <div style={{display:"flex",gap:7,marginTop:10}}>
      {onBack && <button onClick={onBack} style={{flex:1,background:"var(--color-background-secondary)",color:"var(--color-text-primary)",border:`0.5px solid ${C.bdr}`,borderRadius:8,padding:9,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>← ย้อน</button>}
      <button onClick={onNext} style={{flex:2,background:C.line,color:"#fff",border:"none",borderRadius:8,padding:9,cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>{nextLabel}</button>
    </div>
  );
}

// ── Chat Bubble (LINE) ────────────────────────────────────────────────────────
function ChatBubble({m}){
  if(m.from==="sys") return(
    <div style={{textAlign:"center",margin:"2px 0"}}>
      <span style={{background:"rgba(255,255,255,.75)",borderRadius:8,fontSize:10,color:"#5D4037",padding:"3px 10px",display:"inline-block",whiteSpace:"pre-wrap"}}>{m.text}</span>
    </div>
  );
  if(m.from==="alert") return(
    <div style={{textAlign:"center",margin:"3px 0"}}>
      <span style={{background:"#FFF3E0",border:"1px solid #FFE08270",borderRadius:8,fontSize:10,color:"#E65100",padding:"4px 10px",display:"inline-block"}}>{m.text}</span>
    </div>
  );
  const styleMap = {
    r:  {bg:"#DCF8C6",br:"12px 2px 12px 12px",lbl:"แมน",lc:C.line,side:"right"},
    l:  {bg:"#fff",br:"2px 12px 12px 12px",lbl:m.who||"ลูกค้า",lc:"#667781",side:"left"},
    ai: {bg:"#FFF8E1",br:"2px 12px 12px 12px",lbl:"🔔 AI Finovas",lc:C.amber,side:"left"},
    acct:{bg:C.blueBg,br:"2px 12px 12px 12px",lbl:"🧑‍💼 นักบัญชี (น้องบี)",lc:C.blue,side:"left"},
    cust:{bg:"#fff",br:"12px 2px 12px 12px",lbl:"👤 ลูกค้า",lc:"#667781",side:"right"},
    sec: {bg:C.purpleBg,br:"2px 12px 12px 12px",lbl:"📎 เลขา",lc:C.purple,side:"left"},
  };
  const s = styleMap[m.from]||styleMap.l;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:s.side==="right"?"flex-end":"flex-start",marginBottom:5}}>
      <span style={{fontSize:9,color:s.lc,marginBottom:2,padding:"0 3px",fontWeight:500}}>{s.lbl}</span>
      <div style={{background:s.bg,borderRadius:s.br,padding:"7px 11px",fontSize:11.5,lineHeight:1.55,maxWidth:"88%",whiteSpace:"pre-wrap",color:"#111"}}>{m.text}</div>
      {m.time && <span style={{fontSize:9,color:"#667781",marginTop:2,padding:"0 3px"}}>{m.time}</span>}
    </div>
  );
}

// ── LINE เซลล์ Inline Form ────────────────────────────────────────────────────
function SalesForm({onSubmit,onClose}){
  const [step,setStep]=useState(1);
  const [fd,setFd]=useState({name:"",biz:"",svc:"",bizType:"",vat:"",startDate:"",revenue:"",docCount:"",employees:"",price:"",docsGot:[],docsMissing:"",concern:"",promise:"",note:""});
  const s=(k,v)=>setFd(f=>({...f,[k]:v}));
  const save1=()=>{ if(!fd.name){alert("กรุณากรอกชื่อลูกค้าค่ะ");return;} if(!fd.svc){alert("กรุณาเลือกบริการค่ะ");return;} setStep(2); };
  const save2=()=>setStep(3);
  return(
    <div style={{background:C.white,borderTop:`2px solid ${C.line}`,display:"flex",flexDirection:"column",maxHeight:370,flexShrink:0}}>
      <div style={{background:C.linedk,color:"#fff",padding:"9px 14px",display:"flex",alignItems:"center",flexShrink:0}}>
        <span style={{flex:1,fontSize:12,fontWeight:500}}>{step===1?"กรอกข้อมูลลูกค้า (1/3)":step===2?"ข้อมูลธุรกิจ & ราคา (2/3)":"รายละเอียดเพิ่มเติม (3/3)"}</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{padding:"12px 14px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:0}}>
        <StepBar step={step} total={3}/>
        {step===1 && <>
          <FInput label="ชื่อลูกค้า" value={fd.name} onChange={v=>s("name",v)} placeholder="คุณ..." req/>
          <FInput label="ชื่อกิจการ" value={fd.biz} onChange={v=>s("biz",v)} placeholder="บริษัท / ร้านค้า..."/>
          <div style={{marginBottom:8}}>
            <FLabel t="บริการ" req/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              {SVCS.map(sv=>(
                <button key={sv} onClick={()=>s("svc",sv)} style={{border:`0.5px solid ${fd.svc===sv?C.line:C.bdr}`,borderRadius:7,padding:"5px 7px",fontSize:10.5,cursor:"pointer",background:fd.svc===sv?"#E8F5E9":"var(--color-background-secondary)",color:fd.svc===sv?"#1B5E20":"var(--color-text-primary)",fontFamily:"inherit",textAlign:"left"}}>{sv}</button>
              ))}
            </div>
          </div>
          <FInput label="ประเภทธุรกิจ" value={fd.bizType} onChange={v=>s("bizType",v)} placeholder="เช่น ขายของออนไลน์..."/>
          <FRadio label="VAT" opts={["จดแล้ว","ยังไม่จด"]} value={fd.vat} onChange={v=>s("vat",v)}/>
          <BtnRow onNext={save1}/>
        </>}
        {step===2 && <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <FInput label="เริ่มงาน" value={fd.startDate} onChange={v=>s("startDate",v)} placeholder="มิ.ย. 2569"/>
            <FInput label="พนักงาน" value={fd.employees} onChange={v=>s("employees",v)} placeholder="3 คน"/>
            <FInput label="รายได้/เดือน" value={fd.revenue} onChange={v=>s("revenue",v)} placeholder="300k–500k"/>
            <FInput label="เอกสาร/เดือน" value={fd.docCount} onChange={v=>s("docCount",v)} placeholder="~50 รายการ"/>
          </div>
          <FInput label="ราคาที่ตกลง (บาท/เดือน)" value={fd.price} onChange={v=>s("price",v)} placeholder="4000" type="number" req/>
          <div style={{marginBottom:8}}>
            <FLabel t="เอกสารที่ได้รับแล้ว"/>
            {DOCS_LIST.map(d=>(
              <FCheck key={d} label={d} checked={fd.docsGot.includes(d)} onChange={c=>{ if(c) s("docsGot",[...fd.docsGot,d]); else s("docsGot",fd.docsGot.filter(x=>x!==d)); }}/>
            ))}
          </div>
          <FInput label="เอกสารที่ยังขาด" value={fd.docsMissing} onChange={v=>s("docsMissing",v)} placeholder="(ถ้ามี)"/>
          <BtnRow onBack={()=>setStep(1)} onNext={save2}/>
        </>}
        {step===3 && <>
          <FTextarea label="สิ่งที่ลูกค้ากังวล" value={fd.concern} onChange={v=>s("concern",v)} placeholder="เช่น กลัวยื่นภาษีผิด..."/>
          <FTextarea label="สิ่งที่เซลล์รับปากไว้" value={fd.promise} onChange={v=>s("promise",v)} placeholder="- วางแผนภาษีฟรีตลอดปี&#10;- ปิดงบฟรี..." rows={3}/>
          <FTextarea label="หมายเหตุเพิ่มเติม" value={fd.note} onChange={v=>s("note",v)} placeholder="ย้ายมาจากสำนักงานเดิม..."/>
          <BtnRow onBack={()=>setStep(2)} onNext={()=>onSubmit(fd)} nextLabel="💾 บันทึก + ส่งอัตโนมัติ"/>
        </>}
      </div>
    </div>
  );
}

// ── LINE เซลล์ View ───────────────────────────────────────────────────────────
function LineSalesView({onAddCust}){
  const [msgs,setMsgs]=useState([
    {from:"sys",text:"วันนี้ 09:00"},
    {from:"alert",text:"AI แจ้งเตือน: คุณวิภา ค้างเอกสาร 7 วัน — โปรดติดตามค่ะ"},
    {from:"l",who:"ลูกค้าใหม่",text:"สวัสดีค่ะ อยากสอบถามราคาทำบัญชีค่ะ",time:"09:10"},
    {from:"r",text:"สวัสดีค่ะ แมนนี่จาก Finovas ค่ะ ธุรกิจอะไรคะ?",time:"09:11"},
    {from:"l",who:"ลูกค้า",text:"ร้านขายของออนไลน์ค่ะ ยอด ~100,000 บาท/เดือนค่ะ",time:"09:12"},
    {from:"r",text:"SME เลยค่ะ แนะนำแพ็ก 3,500–4,500 บาท/เดือน ครอบคลุม VAT + งบรายไตรมาสค่ะ สนใจนะคะ?",time:"09:13"},
    {from:"l",who:"ลูกค้า",text:"ตกลงเลยค่ะ!",time:"09:14"},
  ]);
  const [inp,setInp]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [done,setDone]=useState(false);
  const add=m=>setMsgs(p=>[...p,m]);

  function submitForm(fd){
    setShowForm(false); setDone(true);
    const name=fd.name||"คุณสมชาย";
    add({from:"r",text:`📌 สรุปลูกค้าหลังปิดการขาย\n\nชื่อลูกค้า : ${name}\nชื่อกิจการ : ${fd.biz||"ABC Trading"}\nบริการ : ${fd.svc||"บัญชีรายเดือนนิติบุคคล"}\nประเภทธุรกิจ : ${fd.bizType||"ขายสินค้าออนไลน์"}\nเริ่มงาน : ${fd.startDate||"มิ.ย. 2569"}\nVAT : ${fd.vat||"จดแล้ว"}\nรายได้/เดือน : ${fd.revenue||"300,000–500,000 บาท"}\nจำนวนเอกสาร : ${fd.docCount||"~50 รายการ"}\nพนักงาน : ${fd.employees||"3 คน"}\nราคาที่ตกลง : ฿${fd.price||"4,000"}/เดือน\nเอกสารรับแล้ว : ${fd.docsGot.length?fd.docsGot.join(", "):"หนังสือรับรอง, ภ.พ.20"}\nเอกสารที่ขาด : ${fd.docsMissing||"-"}\nลูกค้ากังวล : ${fd.concern||"กลัวยื่นภาษีเอง"}\nเซลล์รับปาก : ${fd.promise||"วางแผนภาษีฟรีตลอดปี"}\nหมายเหตุ : ${fd.note||"-"}`,time:"09:18"});
    setTimeout(()=>add({from:"sys",text:`✅ บันทึก ${name} เข้า CRM แล้วค่ะ\nข้อมูลเข้า Dashboard · ส่งสรุปไป LINE เลขาแล้ว\nไม่ต้อง copy ส่งเองนะคะ 🙏`}),600);
    const price=parseInt((fd.price||"4000").toString().replace(/\D/g,""))||4000;
    onAddCust({id:Date.now(),name,biz:fd.biz||"บริษัทใหม่",type:fd.svc?.includes("จด")?"company":fd.svc?.includes("ภาษี")?"annual":"monthly",svc:fd.svc||"บัญชีรายเดือน",status:"B",price,src:"LINE เซลล์",by:"แมน",paid:false,docRisk:fd.docsGot.length<2,pipe:"ลูกค้าปัจจุบัน",bizType:fd.bizType||"SME",concern:fd.concern||""});
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{background:C.linedk,color:"#fff",padding:"10px 14px",flexShrink:0}}>
        <div style={{fontWeight:500,fontSize:12}}>LINE เซลล์ — แมน</div>
        <div style={{fontSize:10,opacity:.8,marginTop:1}}>กด "ปิดลูกค้าได้" เพื่อกรอกฟอร์มในหน้านี้เลย</div>
      </div>
      <div style={{flex:1,overflowY:"auto",background:"#E5DDD5",padding:"9px 8px",display:"flex",flexDirection:"column",gap:0,minHeight:0}}>
        {msgs.map((m,i)=><ChatBubble key={i} m={m}/>)}
      </div>
      {showForm && <SalesForm onSubmit={submitForm} onClose={()=>setShowForm(false)}/>}
      {!showForm && (
        <div style={{padding:"7px 8px",background:"#F0F0F0",display:"flex",gap:5,flexWrap:"wrap",borderTop:"1px solid #ddd",flexShrink:0}}>
          <div style={{width:"100%",fontSize:9,color:"#888",marginBottom:2}}>สถานะการขาย:</div>
          {!done ? <>
            <button onClick={()=>setShowForm(true)} style={{background:C.line,color:"#fff",border:"none",borderRadius:18,padding:"6px 12px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>ปิดลูกค้าได้</button>
            {["รอตัดสินใจ","ไม่สนใจ","นัดคุย"].map(s=>(
              <button key={s} onClick={()=>{add({from:"r",text:s,time:"09:14"});add({from:"sys",text:`บันทึกสถานะ "${s}" แล้วค่ะ`});}} style={{background:"transparent",color:"#128C7E",border:"1.5px solid #128C7E",borderRadius:18,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>
            ))}
          </> : (
            <button onClick={()=>{setDone(false);}} style={{background:C.line,color:"#fff",border:"none",borderRadius:18,padding:"6px 12px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>+ ลูกค้าใหม่</button>
          )}
        </div>
      )}
      <div style={{padding:"7px 8px",display:"flex",gap:6,background:"#F0F0F0",borderTop:"1px solid #ddd",flexShrink:0}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&inp.trim()){add({from:"r",text:inp.trim(),time:"09:15"});setInp("");}}}
          placeholder="พิมพ์ข้อความ..."
          style={{flex:1,border:"none",borderRadius:20,padding:"6px 12px",fontSize:12,fontFamily:"inherit",outline:"none",background:"#fff"}}/>
        <button onClick={()=>{if(inp.trim()){add({from:"r",text:inp.trim(),time:"09:15"});setInp("");}}} style={{background:C.line,color:"#fff",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:13,flexShrink:0}}>➤</button>
      </div>
    </div>
  );
}

// ── เลขา Full Form ────────────────────────────────────────────────────────────
function SecFullForm({job,onClose,onSubmit}){
  const [saved,setSaved]=useState(false);
  // Monthly
  const [mon,setMon]=useState({date:"",accountId:"",name:job?.name||"",tel:"",biz:job?.biz||"",detail:"",price:"",payStatus:"ยังไม่ได้ชำระ",note:"",docType:"นิติบุคคล",senderName:"",receiverName:""});
  // Company
  const [com,setCom]=useState({date:"",lineAcc:"",contact:job?.name||"",tel:"",companyName:job?.biz||"",address:"",vat:"จด VAT",social:"ขึ้นประกันสังคม",capital:"",capitalPct:"",dirCount:1,directors:[{name:"",tel:"",email:""}],shCount:1,shareholders:[{name:"",shares:"",tel:""}],authority:"",obj1:"",obj2:"",senderName:"",receiverName:""});
  const setC=(k,v)=>setCom(f=>({...f,[k]:v}));
  function updDir(i,k,v){setCom(f=>{const d=[...f.directors];d[i]={...d[i],[k]:v};return{...f,directors:d};});}
  function updSh(i,k,v){setCom(f=>{const s=[...f.shareholders];s[i]={...s[i],[k]:v};return{...f,shareholders:s};});}
  function setDirCount(n){const cnt=Math.max(1,Math.min(5,Number(n)));setCom(f=>{const d=[...f.directors];while(d.length<cnt)d.push({name:"",tel:"",email:""});return{...f,dirCount:cnt,directors:d.slice(0,cnt)};});}
  function setShCount(n){const cnt=Math.max(1,Math.min(6,Number(n)));setCom(f=>{const s=[...f.shareholders];while(s.length<cnt)s.push({name:"",shares:"",tel:""});return{...f,shCount:cnt,shareholders:s.slice(0,cnt)};});}
  // Annual tax
  const [tax,setTax]=useState({date:"",accountId:"",name:job?.name||"",tel:"",taxName:"",marital:"โสด",filedBefore:"ไม่เคย",prevUser:"",prevPass:"",incomes:[],incomeNote:"",hasStat:false,statCount:"",banks:[{name:"",code:""},{name:"",code:""},{name:"",code:""},{name:"",code:""}],ded:{child:false,parent:false,spouse:false,disabled:false,lifeIns:false,healthIns:false,ssf:false,rmf:false,homeLoan:false,donation:false,spouseIns:false,parentIns:false},senderName:"",receiverName:""});
  const setT=(k,v)=>setTax(f=>({...f,[k]:v}));
  function togIncome(t){setTax(f=>{const a=[...f.incomes];const i=a.indexOf(t);if(i>=0)a.splice(i,1);else a.push(t);return{...f,incomes:a};});}
  function togDed(k){setTax(f=>({...f,ded:{...f.ded,[k]:!f.ded[k]}}));}
  const INCOMES=[{k:"salary",l:"เงินเดือน (ขอ 50ทวิ)"},{k:"influencer",l:"อินฟูล/รีวิวสินค้า (ขอ 50ทวิ + รายงาน)"},{k:"product",l:"ขายสินค้า"},{k:"gold",l:"เทรดทอง (ขอรายงาน)"},{k:"other",l:"ธุรกิจอื่นๆ"}];
  const DEDS=[{k:"child",l:"บุตร (ขอบัตรปชช/ใบเกิด)"},{k:"parent",l:"พ่อแม่ 60+ (ขอบัตรปชช)"},{k:"spouse",l:"คู่สมรส (ขอบัตรปชช)"},{k:"disabled",l:"อุปการะผู้พิการ"},{k:"lifeIns",l:"ประกันชีวิต (ขอกรมธรรม์+ใบเสร็จ)"},{k:"healthIns",l:"ประกันสุขภาพ (ขอกรมธรรม์+ใบเสร็จ)"},{k:"ssf",l:"กองทุน SSF"},{k:"rmf",l:"กองทุน RMF"},{k:"homeLoan",l:"ดอกเบี้ยกู้บ้าน (ขอหนังสือรับรอง)"},{k:"donation",l:"เงินบริจาค (ขอใบอนุโมทนา)"},{k:"spouseIns",l:"ประกันคู่สมรส (ขอกรมธรรม์+ใบเสร็จ)"},{k:"parentIns",l:"ประกันพ่อแม่ (ขอกรมธรรม์+ใบเสร็จ)"}];

  const isMon=job?.type==="monthly", isCom=job?.type==="company", isAnn=job?.type==="annual";
  function handleSave(){setSaved(true);setTimeout(()=>onSubmit(job?.id),1200);}

  if(saved) return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:C.white,borderRadius:16,padding:32,textAlign:"center",width:"min(320px,90vw)"}}>
        <div style={{fontSize:48,marginBottom:10}}>✅</div>
        <div style={{fontWeight:500,fontSize:15,color:C.green}}>บันทึกครบแล้ว!</div>
        <div style={{fontSize:12,color:C.muted,marginTop:6}}>ส่งต่อทีมบัญชีเรียบร้อยแล้วค่ะ</div>
      </div>
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:200,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:20,paddingBottom:20}}>
      <div style={{background:C.white,borderRadius:16,width:"min(500px,96vw)",boxShadow:"0 8px 40px rgba(0,0,0,.25)"}}>
        <div style={{background:C.navy,borderRadius:"16px 16px 0 0",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{flex:1}}>
            <div style={{color:"#fff",fontWeight:500,fontSize:14}}>{isMon?"📅 ใบรับงาน — ทำรายเดือน":isCom?"🏢 ใบรับงาน — จดบริษัทใหม่":"📋 ทะเบียนลูกค้า — ยื่นภาษีบุคคลธรรมดา"}</div>
            <div style={{color:C.tealBg,fontSize:11,marginTop:2}}>{job?.name} · {job?.biz}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#fff",fontSize:20}}>✕</button>
        </div>
        <div style={{padding:"16px 18px",maxHeight:"78vh",overflowY:"auto"}}>
          {isMon && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="วันที่" value={mon.date} onChange={v=>setMon(f=>({...f,date:v}))} type="date"/>
              <FInput label="Account ID" value={mon.accountId} onChange={v=>setMon(f=>({...f,accountId:v}))} placeholder="ACC-001"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="ชื่อลูกค้า" value={mon.name} onChange={v=>setMon(f=>({...f,name:v}))} placeholder="คุณ..." req/>
              <FInput label="เบอร์ติดต่อ" value={mon.tel} onChange={v=>setMon(f=>({...f,tel:v}))} placeholder="08x-xxx-xxxx"/>
            </div>
            <FInput label="ชื่อบริษัท" value={mon.biz} onChange={v=>setMon(f=>({...f,biz:v}))} placeholder="บริษัท / ร้านค้า..."/>
            <FTextarea label="รายละเอียดธุรกิจ" value={mon.detail} onChange={v=>setMon(f=>({...f,detail:v}))} placeholder="อธิบายลักษณะธุรกิจ..."/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="ค่าบริการ (บาท/เดือน)" value={mon.price} onChange={v=>setMon(f=>({...f,price:v}))} type="number" placeholder="0"/>
              <FRadio label="สถานะชำระ" opts={["ชำระแล้ว","ยังไม่ได้ชำระ"]} value={mon.payStatus} onChange={v=>setMon(f=>({...f,payStatus:v}))}/>
            </div>
            <SectionLabel>📂 เอกสาร</SectionLabel>
            <FRadio label="ประเภท" opts={["บุคคลธรรมดา (บัตรปชช หน้า-หลัง)","นิติบุคคล (หนังสือรับรอง)"]} value={mon.docType} onChange={v=>setMon(f=>({...f,docType:v}))}/>
            <FTextarea label="หมายเหตุ" value={mon.note} onChange={v=>setMon(f=>({...f,note:v}))} placeholder="..."/>
          </>}
          {isCom && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="วันที่" value={com.date} onChange={v=>setC("date",v)} type="date"/>
              <FInput label="Line Account" value={com.lineAcc} onChange={v=>setC("lineAcc",v)} placeholder="@..."/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="ชื่อผู้ติดต่อ" value={com.contact} onChange={v=>setC("contact",v)} placeholder="คุณ..." req/>
              <FInput label="เบอร์ติดต่อ" value={com.tel} onChange={v=>setC("tel",v)} placeholder="08x-xxx-xxxx"/>
            </div>
            <FInput label="ชื่อที่จอง (บริษัท / หจก)" value={com.companyName} onChange={v=>setC("companyName",v)} placeholder="บริษัท XYZ จำกัด" req/>
            <FTextarea label="ที่อยู่" value={com.address} onChange={v=>setC("address",v)} placeholder="เลขที่ / ถนน / แขวง..."/>
            <SectionLabel>⚙️ ตั้งค่าบริษัท</SectionLabel>
            <FRadio label="จด VAT" opts={["จด VAT","ไม่จด VAT"]} value={com.vat} onChange={v=>setC("vat",v)}/>
            <FRadio label="ประกันสังคม" opts={["ขึ้นประกันสังคม","ไม่ขึ้นประกันสังคม"]} value={com.social} onChange={v=>setC("social",v)}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="ทุนจดทะเบียน (บาท)" value={com.capital} onChange={v=>setC("capital",v)} placeholder="1,000,000" type="number"/>
              <FInput label="ชำระ (%)" value={com.capitalPct} onChange={v=>setC("capitalPct",v)} placeholder="25" type="number"/>
            </div>
            <SectionLabel>👔 กรรมการ</SectionLabel>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:12,color:"var(--color-text-primary)"}}>จำนวนกรรมการ</span>
              <input type="number" min="1" max="5" value={com.dirCount} onChange={e=>setDirCount(e.target.value)} style={{width:60,border:`0.5px solid ${C.bdr}`,borderRadius:7,padding:"5px 8px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}/>
            </div>
            {com.directors.map((d,i)=>(
              <div key={i} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10,marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:6}}>กรรมการที่ {i+1}</div>
                <FInput label="ชื่อ-นามสกุล" value={d.name} onChange={v=>updDir(i,"name",v)} placeholder="คุณ..."/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <FInput label="เบอร์โทร" value={d.tel} onChange={v=>updDir(i,"tel",v)} placeholder="08x..."/>
                  <FInput label="อีเมล" value={d.email} onChange={v=>updDir(i,"email",v)} placeholder="email@..."/>
                </div>
              </div>
            ))}
            <FTextarea label="อำนาจกรรมการ" value={com.authority} onChange={v=>setC("authority",v)} placeholder="เช่น กรรมการผู้มีอำนาจลงชื่อร่วมกัน 2 คน..."/>
            <SectionLabel>👥 ผู้ถือหุ้น</SectionLabel>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:12,color:"var(--color-text-primary)"}}>จำนวนผู้ถือหุ้น</span>
              <input type="number" min="1" max="6" value={com.shCount} onChange={e=>setShCount(e.target.value)} style={{width:60,border:`0.5px solid ${C.bdr}`,borderRadius:7,padding:"5px 8px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}/>
            </div>
            {com.shareholders.map((sh,i)=>(
              <div key={i} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:10,marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:6}}>ผู้ถือหุ้นที่ {i+1}</div>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8}}>
                  <FInput label="ชื่อ-นามสกุล" value={sh.name} onChange={v=>updSh(i,"name",v)} placeholder="คุณ..."/>
                  <FInput label="หุ้น / %" value={sh.shares} onChange={v=>updSh(i,"shares",v)} placeholder="50%"/>
                  <FInput label="เบอร์" value={sh.tel} onChange={v=>updSh(i,"tel",v)} placeholder="08x..."/>
                </div>
              </div>
            ))}
            <SectionLabel>🎯 วัตถุประสงค์</SectionLabel>
            <FTextarea label="วัตถุประสงค์ที่ 1" value={com.obj1} onChange={v=>setC("obj1",v)} placeholder="ประกอบกิจการ..."/>
            <FTextarea label="วัตถุประสงค์ที่ 2 (ถ้ามี)" value={com.obj2} onChange={v=>setC("obj2",v)} placeholder="..."/>
            <SectionLabel>📄 เอกสารที่ต้องขอ</SectionLabel>
            <div style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"10px",marginBottom:10,fontSize:12,color:"var(--color-text-primary)",lineHeight:2}}>
              ☑️ หน้าบัตรปชช + เลขหลังบัตรปชช<br/>
              ☑️ หน้าทะเบียนบ้าน (เห็นเลขรหัสประจำบ้าน)<br/>
              ☑️ โลเคชั่น
            </div>
          </>}
          {isAnn && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="วันที่" value={tax.date} onChange={v=>setT("date",v)} type="date"/>
              <FInput label="Account ID" value={tax.accountId} onChange={v=>setT("accountId",v)} placeholder="ACC-001"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <FInput label="ชื่อลูกค้า" value={tax.name} onChange={v=>setT("name",v)} placeholder="คุณ..." req/>
              <FInput label="เบอร์ติดต่อ" value={tax.tel} onChange={v=>setT("tel",v)} placeholder="08x-xxx-xxxx"/>
            </div>
            <FInput label="ยื่นภาษีในชื่อ (ขอบัตรปชช หน้า-หลัง)" value={tax.taxName} onChange={v=>setT("taxName",v)} placeholder="ชื่อตามบัตรปชช"/>
            <FRadio label="สถานะ" opts={["โสด","สมรส"]} value={tax.marital} onChange={v=>setT("marital",v)}/>
            {tax.marital==="สมรส" && <div style={{background:C.amberBg,borderRadius:8,padding:"8px 10px",fontSize:11,color:C.amber,fontWeight:500,marginBottom:10}}>⚠️ สมรส: ขอหน้าบัตรปชช คู่สมรสด้วย</div>}
            <FRadio label="เคยยื่นภาษีบุคคลธรรมดา" opts={["ไม่เคย","เคย"]} value={tax.filedBefore} onChange={v=>setT("filedBefore",v)}/>
            {tax.filedBefore==="เคย" && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <FInput label="USERNAME" value={tax.prevUser} onChange={v=>setT("prevUser",v)} placeholder="user..."/>
                <FInput label="PASSWORD" value={tax.prevPass} onChange={v=>setT("prevPass",v)} placeholder="pass..." type="password"/>
              </div>
            )}
            <SectionLabel>💰 รายได้</SectionLabel>
            {INCOMES.map(({k,l})=><FCheck key={k} label={l} checked={tax.incomes.includes(k)} onChange={()=>togIncome(k)}/>)}
            {tax.incomes.includes("other") && <FTextarea label="อธิบายลักษณะธุรกิจ" value={tax.incomeNote} onChange={v=>setT("incomeNote",v)} placeholder="อธิบายธุรกิจ..."/>}
            <SectionLabel>🏦 Statement</SectionLabel>
            <FRadio label="มี Statement" opts={["ไม่มี","มี"]} value={tax.hasStat?"มี":"ไม่มี"} onChange={v=>setT("hasStat",v==="มี")}/>
            {tax.hasStat && <>
              <FInput label="จำนวนบัญชี" value={tax.statCount} onChange={v=>setT("statCount",v)} placeholder="2" type="number"/>
              {Array.from({length:Math.min(4,Number(tax.statCount)||0)}).map((_,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8}}>
                  <FInput label={`ธนาคารที่ ${i+1}`} value={tax.banks[i]?.name||""} onChange={v=>setTax(f=>{const b=[...f.banks];b[i]={...b[i],name:v};return{...f,banks:b};})} placeholder="ชื่อธนาคาร"/>
                  <FInput label="รหัสเปิด" value={tax.banks[i]?.code||""} onChange={v=>setTax(f=>{const b=[...f.banks];b[i]={...b[i],code:v};return{...f,banks:b};})} placeholder="รหัส"/>
                </div>
              ))}
            </>}
            <SectionLabel>🎁 รายการลดหย่อน</SectionLabel>
            {DEDS.map(({k,l})=><FCheck key={k} label={l} checked={tax.ded[k]} onChange={()=>togDed(k)}/>)}
          </>}
          <SectionLabel>✍️ ลงชื่อ</SectionLabel>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <FInput label="ผู้ส่งเรื่อง (เซลล์)" value={isMon?mon.senderName:isCom?com.senderName:tax.senderName} onChange={v=>isMon?setMon(f=>({...f,senderName:v})):isCom?setC("senderName",v):setT("senderName",v)} placeholder="ชื่อเซลล์..."/>
            <FInput label="ผู้รับเรื่อง (เลขา)" value={isMon?mon.receiverName:isCom?com.receiverName:tax.receiverName} onChange={v=>isMon?setMon(f=>({...f,receiverName:v})):isCom?setC("receiverName",v):setT("receiverName",v)} placeholder="ชื่อเลขา..."/>
          </div>
          <button onClick={handleSave} style={{width:"100%",background:C.teal,color:"#fff",border:"none",borderRadius:8,padding:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:13,marginTop:8}}>💾 บันทึกครบ + ส่งต่อทีมบัญชี</button>
          <button onClick={onClose} style={{width:"100%",background:"transparent",color:C.muted,border:"none",padding:"8px",cursor:"pointer",fontSize:12,fontFamily:"inherit",marginTop:4}}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
}

// ── LINE เลขา View ────────────────────────────────────────────────────────────
function LineSecView(){
  const [jobs,setJobs]=useState(PENDING_JOBS_INIT);
  const [openJob,setOpenJob]=useState(null);
  const [msgs,setMsgs]=useState([
    {from:"sec",text:"📎 ได้รับฟอร์มรับงานจดบริษัท: คุณเพชร (Diamond Property)\nส่งต่อทีมบัญชีเรียบร้อยแล้วค่ะ ✅"},
    {from:"alert",text:"AI แจ้งเตือน: ฟอร์มรับงานรอกรอกเพิ่มเติม 2 รายการ — กดปุ่มด้านบนเพื่อกรอกค่ะ"},
  ]);
  const [inp,setInp]=useState("");

  function handleSubmit(id){
    const job=jobs.find(x=>x.id===id);
    setJobs(j=>j.map(x=>x.id===id?{...x,status:"done"}:x));
    setMsgs(m=>[...m,{from:"sec",text:`✅ กรอกฟอร์ม ${job?.formType} ครบแล้ว\nชื่อ: ${job?.name} · ${job?.biz}\nส่งต่อทีมบัญชีเรียบร้อยค่ะ`}]);
    setTimeout(()=>setOpenJob(null),1500);
  }
  const tcol={monthly:C.teal,company:C.purple,annual:C.amber};
  const tic={monthly:"📅",company:"🏢",annual:"📋"};
  const pending=jobs.filter(j=>j.status==="pending");
  const done=jobs.filter(j=>j.status==="done");

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{background:C.purple,color:"#fff",padding:"10px 14px",flexShrink:0}}>
        <div style={{fontWeight:500,fontSize:12}}>LINE เลขา — รับฟอร์มจากเซลล์ → ส่งต่อทีมบัญชี</div>
        <div style={{fontSize:10,opacity:.85,marginTop:1}}>กดปุ่ม "กรอกฟอร์มเพิ่มเติม" เพื่อกรอกรายละเอียดให้ครบ</div>
      </div>
      {/* inbox */}
      <div style={{padding:"10px 12px",background:"var(--color-background-secondary)",flexShrink:0,borderBottom:`0.5px solid ${C.bdr}`,maxHeight:220,overflowY:"auto"}}>
        {pending.length>0 && <>
          <div style={{fontSize:10,fontWeight:500,color:C.red,marginBottom:7}}>รอกรอกฟอร์มเพิ่มเติม ({pending.length} รายการ)</div>
          {pending.map(j=>(
            <div key={j.id} style={{background:C.white,border:`0.5px solid ${C.bdr}`,borderLeft:`3px solid ${tcol[j.type]||C.teal}`,borderRadius:8,padding:"9px 12px",marginBottom:7,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:16}}>{tic[j.type]}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:500,fontSize:12,color:"var(--color-text-primary)"}}>{j.name} <span style={{color:C.muted,fontWeight:400}}>· {j.biz}</span></div>
                <div style={{fontSize:10,color:C.muted}}>{j.formType} · เซลล์: {j.by}</div>
              </div>
              <button onClick={()=>setOpenJob(j)} style={{background:C.purple,color:"#fff",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:11,flexShrink:0}}>📝 กรอกฟอร์มเพิ่มเติม</button>
            </div>
          ))}
        </>}
        {done.length>0 && <>
          <div style={{fontSize:10,fontWeight:500,color:C.green,marginBottom:6}}>ส่งต่อบัญชีแล้ว ({done.length} รายการ)</div>
          {done.map(j=>(
            <div key={j.id} style={{background:C.greenBg,border:`0.5px solid ${C.green}30`,borderRadius:8,padding:"7px 12px",marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:14}}>{tic[j.type]}</span>
              <div style={{flex:1}}><div style={{fontWeight:500,fontSize:12,color:"var(--color-text-primary)"}}>{j.name}</div><div style={{fontSize:10,color:C.muted}}>{j.formType}</div></div>
              <span style={{fontSize:10,color:C.green,fontWeight:500}}>✅ ส่งแล้ว</span>
            </div>
          ))}
        </>}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"10px",background:"#FAFBFC",display:"flex",flexDirection:"column",gap:4,minHeight:0}}>
        {msgs.map((m,i)=><ChatBubble key={i} m={{...m,from:m.from==="sec"?"sec":m.from}}/>)}
      </div>
      <div style={{padding:"8px 10px",borderTop:`0.5px solid ${C.bdr}`,display:"flex",gap:6,background:C.white,flexShrink:0}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&inp.trim()){setMsgs(m=>[...m,{from:"sec",text:inp.trim()}]);setInp("");}}} placeholder="เลขาบันทึกหมายเหตุ..."
          style={{flex:1,border:`0.5px solid ${C.bdr}`,borderRadius:20,padding:"6px 12px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}/>
        <button onClick={()=>{if(inp.trim()){setMsgs(m=>[...m,{from:"sec",text:inp.trim()}]);setInp("");}}} style={{background:C.purple,color:"#fff",border:"none",borderRadius:20,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>ส่ง</button>
      </div>
      {openJob && <SecFullForm job={openJob} onClose={()=>setOpenJob(null)} onSubmit={handleSubmit}/>}
    </div>
  );
}

// ── LINE บัญชี View ───────────────────────────────────────────────────────────
function LineAcctView(){
  const custOpts=[{l:"คุณสมชาย (รายเดือน)"},{l:"คุณนิภา (ยื่นภาษี)"},{l:"คุณเพชร (จดบริษัท)"}];
  const [curCust,setCurCust]=useState(0);
  const [msgs,setMsgs]=useState(ACCT_CHATS_BY_CUST[0]);
  const [inp,setInp]=useState("");
  function pickCust(i){ setCurCust(i); setMsgs(ACCT_CHATS_BY_CUST[i]); }
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{background:C.blue,color:"#fff",padding:"10px 14px",flexShrink:0}}>
        <div style={{fontWeight:500,fontSize:12}}>LINE บัญชี — ลูกค้าที่จ่ายเงินแล้ว</div>
        <div style={{fontSize:10,opacity:.85,marginTop:1}}>AI แจ้งเตือนลูกค้าโดยตรง + นักบัญชีดูแลควบคู่</div>
      </div>
      <div style={{padding:"6px 10px",background:C.blueBg,borderBottom:`0.5px solid ${C.blue}30`,display:"flex",gap:6,flexShrink:0,overflowX:"auto"}}>
        {custOpts.map((c,i)=>(
          <button key={i} onClick={()=>pickCust(i)} style={{background:curCust===i?C.blue:"transparent",color:curCust===i?"#fff":C.blue,border:`1px solid ${C.blue}`,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{c.l}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",background:"#E5DDD5",padding:"9px 8px",display:"flex",flexDirection:"column",gap:4,minHeight:0}}>
        {msgs.map((m,i)=><ChatBubble key={i} m={m}/>)}
      </div>
      <div style={{padding:"8px 10px",borderTop:`0.5px solid ${C.bdr}`,display:"flex",gap:6,background:C.white,flexShrink:0}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&inp.trim()){setMsgs(m=>[...m,{from:"acct",text:inp.trim(),time:"ตอนนี้"}]);setInp("");}}} placeholder="นักบัญชีพิมพ์ตอบลูกค้า..."
          style={{flex:1,border:`0.5px solid ${C.bdr}`,borderRadius:20,padding:"6px 12px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white}}/>
        <button onClick={()=>{if(inp.trim()){setMsgs(m=>[...m,{from:"acct",text:inp.trim(),time:"ตอนนี้"}]);setInp("");}}} style={{background:C.blue,color:"#fff",border:"none",borderRadius:20,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>ส่ง</button>
      </div>
    </div>
  );
}

// ── CRM View ──────────────────────────────────────────────────────────────────
function mapCust(c){
  return {
    id:c.id, name:c.name||'', biz:c.biz||'',
    type:c.cust_type||'monthly', svc:c.service||'',
    status:c.status||'A', price:c.price||0,
    src:c.source||'-', by:c.sales_by||'-',
    paid:c.paid||false, docRisk:c.doc_risk==='high',
    pipe:c.pipeline_status||'รอโทร',
    bizType:c.biz_type||'', concern:c.concern||'',
    phone:c.phone||'', phone_emergency:c.phone_emergency||'',
    platform:c.platform||'', social_id:c.social_id||'',
    services:c.services||'[]', note:c.note||'',
  };
}

function DashboardView({custs}){
  const API='https://finovas-crm-production.up.railway.app';
  const [ratings,setRatings]=React.useState([]);
  const [docsChecked,setDocsChecked]=React.useState(0);

  React.useEffect(()=>{
    fetch(`${API}/api/ratings`).then(r=>r.json()).then(d=>setRatings(Array.isArray(d)?d:[])).catch(()=>{});
    fetch(`${API}/api/documents`).then(r=>r.json()).then(d=>setDocsChecked((Array.isArray(d)?d:[]).filter(x=>x.status==='checked').length)).catch(()=>{});
  },[]);

  const avgScore=ratings.length?(ratings.reduce((s,r)=>s+(r.score||0),0)/ratings.length).toFixed(1):'-';
  const monthly=custs.filter(c=>c.type==="monthly");
  const company=custs.filter(c=>c.type==="company");
  const annual=custs.filter(c=>c.type==="annual");
  const rev=custs.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
  const docRisk=custs.filter(c=>c.docRisk);
  const unpaid=custs.filter(c=>c.status==="B"&&!c.paid);
  const sources={};custs.forEach(c=>{if(c.src&&c.src!=='-')sources[c.src]=(sources[c.src]||0)+1;});
  const salesNames=[...new Set(custs.map(c=>c.by).filter(b=>b&&b!=='-'))];
  const salesColors=["#6C5CE7","#00B894","#0984E3","#EF9F27"];
  const salesBgs=["#EEEBff","#E0FAF4","#E8F4FD","#FFF8E1"];

  return(
    <div style={{padding:16,overflowY:"auto",flex:1,background:"#F4F3FF"}}>

      {/* KPI Cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[
          {icon:"👥",label:"ลูกค้าทั้งหมด",val:custs.length,sub:`${monthly.length} รายเดือน`,bg:"linear-gradient(135deg,#AFA9EC,#EEEBff)",tc:"#26215C",sc:"#534AB7",mc:"#7F77DD"},
          {icon:"💰",label:"รายได้/เดือน",val:`฿${rev.toLocaleString()}`,sub:"ชำระแล้วทั้งหมด",bg:"linear-gradient(135deg,#5DCAA5,#E1F5EE)",tc:"#04342C",sc:"#0F6E56",mc:"#1D9E75"},
          {icon:"⏳",label:"ยังไม่ชำระ",val:unpaid.length,sub:"ลูกค้าปัจจุบัน",bg:"linear-gradient(135deg,#EF9F27,#FAEEDA)",tc:"#412402",sc:"#633806",mc:"#854F0B"},
          {icon:"📄",label:"เอกสารค้าง",val:docRisk.length,sub:"ต้องติดตามด่วน",bg:"linear-gradient(135deg,#F09595,#FCEBEB)",tc:"#501313",sc:"#791F1F",mc:"#A32D2D"},
        ].map(k=>(
          <div key={k.label} style={{background:k.bg,borderRadius:16,padding:"18px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",width:60,height:60,top:-15,right:-15,borderRadius:"50%",background:"rgba(255,255,255,.5)"}}/>
            <div style={{fontSize:22,marginBottom:6}}>{k.icon}</div>
            <div style={{fontSize:24,fontWeight:800,color:k.tc,letterSpacing:-.5}}>{k.val}</div>
            <div style={{fontSize:11,color:k.sc,marginTop:2,fontWeight:600}}>{k.label}</div>
            <div style={{fontSize:10,color:k.mc,marginTop:1}}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Service strip */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        <div style={{background:"#EEEBff",borderRadius:14,padding:"14px 10px",borderTop:"3px solid #6C5CE7",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:4}}>📅</div>
          <div style={{fontSize:24,fontWeight:800,color:"#6C5CE7"}}>{monthly.length}</div>
          <div style={{fontSize:10,color:"#8B8BAD",marginTop:3}}>รายเดือน</div>
        </div>
        <div style={{background:"#E8F4FD",borderRadius:14,padding:"14px 10px",borderTop:"3px solid #0984E3",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:4}}>🏢</div>
          <div style={{fontSize:24,fontWeight:800,color:"#0984E3"}}>{company.length}</div>
          <div style={{fontSize:10,color:"#8B8BAD",marginTop:3}}>จดบริษัท</div>
        </div>
        <div style={{background:"#E0FAF4",borderRadius:14,padding:"14px 10px",borderTop:"3px solid #00B894",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:4}}>📋</div>
          <div style={{fontSize:24,fontWeight:800,color:"#00B894"}}>{annual.length}</div>
          <div style={{fontSize:10,color:"#8B8BAD",marginTop:3}}>ยื่นภาษี</div>
        </div>
      </div>

      {/* สถานะลูกค้า */}
      <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E6FF",padding:16,marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,color:"#1E1B4B",marginBottom:14}}>สถานะลูกค้า</div>
        {[
          {key:"A",label:"สอบถามใหม่",color:"#6C5CE7"},
          {key:"B",label:"ลูกค้าปัจจุบัน",color:"#00B894"},
          {key:"D",label:"หายไป >90วัน",color:"#D63031"},
        ].map(s=>{
          const n=custs.filter(c=>c.status===s.key).length;
          const p=custs.length?Math.round(n/custs.length*100):0;
          return(
            <div key={s.key} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:10,height:10,borderRadius:3,background:s.color}}/>
                  <span style={{fontSize:12,color:"#1E1B4B",fontWeight:500}}>{s.label}</span>
                </div>
                <span style={{fontSize:12,fontWeight:700,color:s.color}}>{n} ราย · {p}%</span>
              </div>
              <div style={{height:8,borderRadius:4,background:"#F0EFF8",overflow:"hidden"}}>
                <div style={{width:`${p}%`,height:"100%",borderRadius:4,background:s.color,transition:"width .4s"}}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* ทีมบัญชี + ช่องทาง */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E6FF",padding:14}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1E1B4B",marginBottom:10}}>ทีมบัญชี</div>
          {[
            {label:"เอกสารตรวจ",val:`${docsChecked} ไฟล์`,c:"#6C5CE7",bg:"#EEEBff"},
            {label:"คะแนน",val:`${avgScore}/5 ⭐`,c:"#00B894",bg:"#E0FAF4"},
            {label:"รีวิว",val:`${ratings.length} ครั้ง`,c:"#0984E3",bg:"#E8F4FD"},
          ].map(i=>(
            <div key={i.label} style={{borderRadius:10,padding:"9px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7,background:i.bg}}>
              <span style={{fontSize:11,color:"#8B8BAD"}}>{i.label}</span>
              <span style={{fontSize:12,fontWeight:700,color:i.c}}>{i.val}</span>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E6FF",padding:14}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1E1B4B",marginBottom:10}}>ช่องทางที่มา</div>
          {Object.keys(sources).length===0&&<div style={{color:"#8B8BAD",fontSize:12,textAlign:"center",padding:"10px 0"}}>ยังไม่มีข้อมูล</div>}
          {Object.entries(sources).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([s,n],i)=>{
            const bc=["#6C5CE7","#A29BFE","#CECBF6","#EEEBff"][i];
            return(
              <div key={s} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                  <span style={{color:"#8B8BAD"}}>{s}</span>
                  <span style={{fontWeight:700,color:"#6C5CE7"}}>{n}</span>
                </div>
                <div style={{height:8,borderRadius:4,background:"#F0EFF8",overflow:"hidden"}}>
                  <div style={{width:`${custs.length?Math.round(n/custs.length*100):0}%`,height:"100%",borderRadius:4,background:bc}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ผลงานเซลล์ */}
      <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E6FF",padding:16,marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,color:"#1E1B4B",marginBottom:12}}>ผลงานเซลล์</div>
        {salesNames.length===0&&<div style={{color:"#8B8BAD",fontSize:12,textAlign:"center",padding:"10px 0"}}>ยังไม่มีข้อมูล</div>}
        {salesNames.map((name,ni)=>{
          const mine=custs.filter(c=>c.by===name&&c.status==="B");
          const myRev=mine.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
          const color=salesColors[ni%salesColors.length];
          const bg=salesBgs[ni%salesBgs.length];
          const p=custs.length?Math.round(mine.length/custs.length*100):0;
          return(
            <div key={name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:ni<salesNames.length-1?12:0}}>
              <div style={{width:40,height:40,borderRadius:12,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color,fontSize:16,flexShrink:0}}>{name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13,color:"#1E1B4B"}}>{name}</div>
                <div style={{height:8,borderRadius:4,background:"#F0EFF8",overflow:"hidden",marginTop:5}}>
                  <div style={{width:`${p}%`,height:"100%",borderRadius:4,background:color,transition:"width .4s"}}/>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontWeight:800,color:"#00B894",fontSize:14}}>฿{myRev.toLocaleString()}</div>
                <div style={{fontSize:10,color:"#8B8BAD"}}>{mine.length} ราย</div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}


// ── Feed File Modal (AI แยกประเภทลูกค้า) ──────────────────────────────────────
function FeedFileModal({onClose,onImport}){
  const [file,setFile]=React.useState(null);
  const [rows,setRows]=React.useState([]);
  const [loading,setLoading]=React.useState(false);
  const [done,setDone]=React.useState(false);
  const ANTHROPIC_KEY=''; // Key อยู่ฝั่ง backend แล้ว — ใช้ /api/ai/classify แทน

  function parseCSV(text){
    const lines=text.trim().split(/\r?\n/);
    const headers=lines[0].split(',').map(h=>h.trim().replace(/"/g,''));
    return lines.slice(1).map(line=>{
      const vals=line.split(',').map(v=>v.trim().replace(/"/g,''));
      const obj={};
      headers.forEach((h,i)=>obj[h]=vals[i]||'');
      return obj;
    }).filter(r=>Object.values(r).some(v=>v));
  }

  async function handleFile(e){
    const f=e.target.files[0];
    if(!f)return;
    setFile(f);
    setLoading(true);
    setRows([]);
    const text=await f.text();
    const rawRows=parseCSV(text).slice(0,50);
    // AI วิเคราะห์แยกประเภท
    try{
      const prompt=`วิเคราะห์รายชื่อลูกค้าต่อไปนี้แล้วตอบเป็น JSON array เท่านั้น ไม่ต้องมีข้อความอื่น แต่ละ item มี field: name(ชื่อ), biz(กิจการ), type("person" สำหรับบุคคล หรือ "company" สำหรับบริษัท/นิติบุคคล), cust_type("monthly"/"company"/"annual" ตามประเภทบริการ ถ้าไม่ชัดให้ใช้ monthly), reason(เหตุผลสั้นๆ ที่แยกประเภทนี้)
รายชื่อ: ${JSON.stringify(rawRows.map(r=>({name:r.name||r.ชื่อ||r.ชื่อลูกค้า||'',biz:r.biz||r.กิจการ||r.ชื่อกิจการ||'',svc:r.service||r.บริการ||r.ประเภทบริการ||''})))}`;
      const res=await fetch('https://finovas-crm-production.up.railway.app/api/ai/classify',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({prompt})
      });
      const data=await res.json();
      const txt=data.text||'[]';
      const clean=txt.replace(/```json|```/g,'').trim();
      const analyzed=JSON.parse(clean);
      setRows(analyzed.map((r,i)=>({...r,id:Date.now()+i,selected:true})));
    }catch(e){
      // fallback: ใช้ rule-based
      const analyzed=rawRows.map((r,i)=>{
        const name=r.name||r.ชื่อ||r.ชื่อลูกค้า||'';
        const biz=r.biz||r.กิจการ||r.ชื่อกิจการ||'';
        const combined=(name+biz).toLowerCase();
        const isCompany=/บริษัท|หจก|จำกัด|ร้าน|ห้าง|co\.ltd|company/.test(combined);
        return {id:Date.now()+i,name,biz,type:isCompany?'company':'person',cust_type:isCompany?'company':'monthly',reason:isCompany?'พบคำนิติบุคคล':'ชื่อบุคคลธรรมดา',selected:true};
      });
      setRows(analyzed);
    }
    setLoading(false);
  }

  function toggleRow(id){setRows(r=>r.map(x=>x.id===id?{...x,selected:!x.selected}:x));}
  function toggleAll(){const allSel=rows.every(r=>r.selected);setRows(r=>r.map(x=>({...x,selected:!allSel})));}

  async function doImport(){
    const selected=rows.filter(r=>r.selected);
    if(!selected.length)return;
    setLoading(true);
    const API='https://finovas-crm-production.up.railway.app';
    const imported=[];
    for(const r of selected){
      try{
        const res=await fetch(`${API}/api/customers`,{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({name:r.name,biz:r.biz,cust_type:r.cust_type,status:'A',source:'ฟีดไฟล์',pipeline_status:'รอโทร'})});
        const data=await res.json();
        if(data.id) imported.push(mapCust(data));
      }catch(e){}
    }
    onImport(imported);
    setDone(true);
    setLoading(false);
  }

  const persons=rows.filter(r=>r.type==='person');
  const companies=rows.filter(r=>r.type==='company');

  return(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:'fixed',inset:0,background:'rgba(30,27,75,.6)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:'24px 24px 0 0',padding:'24px 20px',width:'100%',maxWidth:560,maxHeight:'90vh',overflowY:'auto'}}>
        {done?(
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:56,marginBottom:16}}>✅</div>
            <div style={{fontSize:20,fontWeight:800,color:'#534AB7',marginBottom:8}}>นำเข้าสำเร็จแล้วค่ะ!</div>
            <div style={{fontSize:14,color:'#8B8BAD',marginBottom:20}}>ลูกค้าปรากฏในรายชื่อแล้วค่ะ</div>
            <button onClick={onClose} style={{background:'linear-gradient(135deg,#534AB7,#6C5CE7)',color:'#fff',border:'none',borderRadius:12,padding:'13px 32px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>ปิด</button>
          </div>
        ):(
          <>
            <div style={{fontSize:18,fontWeight:800,color:'#1E1B4B',marginBottom:4}}>📤 ฟีดไฟล์รายชื่อลูกค้า</div>
            <div style={{fontSize:13,color:'#8B8BAD',marginBottom:20}}>AI จะแยกบุคคลและบริษัทให้อัตโนมัติค่ะ รองรับ .csv, .xlsx</div>
            {!rows.length&&!loading&&(
              <label style={{display:'block',border:'2px dashed #AFA9EC',borderRadius:16,padding:32,textAlign:'center',background:'#F9F8FF',cursor:'pointer',marginBottom:16}}>
                <div style={{fontSize:36,marginBottom:10}}>📊</div>
                <div style={{fontSize:16,fontWeight:700,color:'#1E1B4B',marginBottom:6}}>ลากไฟล์มาวางที่นี่</div>
                <div style={{fontSize:13,color:'#8B8BAD',marginBottom:12}}>หรือกดเพื่อเลือกไฟล์</div>
                <div style={{display:'inline-block',background:'#EEEBff',border:'1.5px solid #AFA9EC',borderRadius:10,padding:'8px 20px',fontSize:13,fontWeight:600,color:'#534AB7'}}>เลือกไฟล์</div>
                <input type="file" accept=".csv,.xlsx,.xls" style={{display:'none'}} onChange={handleFile}/>
              </label>
            )}
            {loading&&<div style={{textAlign:'center',padding:'32px 0',color:'#534AB7',fontSize:15,fontWeight:600}}>🤖 AI กำลังวิเคราะห์และแยกประเภท...</div>}
            {rows.length>0&&(
              <>
                <div style={{display:'flex',gap:10,marginBottom:14}}>
                  <div style={{flex:1,background:'#E6F1FB',border:'1px solid #85B7EB',borderRadius:12,padding:'10px 14px',textAlign:'center'}}>
                    <div style={{fontSize:11,color:'#0C447C',fontWeight:700,marginBottom:2}}>บุคคลธรรมดา</div>
                    <div style={{fontSize:22,fontWeight:800,color:'#185FA5'}}>{persons.length}</div>
                  </div>
                  <div style={{flex:1,background:'#EEEBff',border:'1px solid #AFA9EC',borderRadius:12,padding:'10px 14px',textAlign:'center'}}>
                    <div style={{fontSize:11,color:'#3C3489',fontWeight:700,marginBottom:2}}>นิติบุคคล/บริษัท</div>
                    <div style={{fontSize:22,fontWeight:800,color:'#534AB7'}}>{companies.length}</div>
                  </div>
                  <div style={{flex:1,background:'#E1F5EE',border:'1px solid #5DCAA5',borderRadius:12,padding:'10px 14px',textAlign:'center'}}>
                    <div style={{fontSize:11,color:'#085041',fontWeight:700,marginBottom:2}}>เลือกแล้ว</div>
                    <div style={{fontSize:22,fontWeight:800,color:'#0F6E56'}}>{rows.filter(r=>r.selected).length}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px',background:'#E6F1FB',borderRadius:10,marginBottom:10}}>
                  <div style={{fontSize:13,color:'#0C447C',fontWeight:600}}>รายชื่อทั้งหมด {rows.length} ราย</div>
                  <button onClick={toggleAll} style={{fontSize:12,color:'#185FA5',fontWeight:700,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>{rows.every(r=>r.selected)?'ยกเลิกทั้งหมด':'เลือกทั้งหมด'}</button>
                </div>
                <div style={{maxHeight:280,overflowY:'auto',display:'flex',flexDirection:'column',gap:6,marginBottom:16}}>
                  {rows.map(r=>(
                    <div key={r.id} onClick={()=>toggleRow(r.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:r.selected?'#EEEBff':'#F9F8FF',borderRadius:12,cursor:'pointer',border:`1.5px solid ${r.selected?'#AFA9EC':'transparent'}`}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:r.type==='company'?'#EEEBff':'#E6F1FB',color:r.type==='company'?'#3C3489':'#0C447C',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,flexShrink:0}}>{r.name?.slice(0,2)||'?'}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'#1E1B4B'}}>{r.name}</div>
                        <div style={{fontSize:12,color:'#8B8BAD'}}>{r.biz||'-'}</div>
                      </div>
                      <span style={{background:r.type==='company'?'#EEEBff':'#E6F1FB',color:r.type==='company'?'#3C3489':'#0C447C',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:700,whiteSpace:'nowrap'}}>{r.type==='company'?'🏢 บริษัท':'👤 บุคคล'}</span>
                      <div style={{width:20,height:20,borderRadius:5,border:'2px solid',borderColor:r.selected?'#534AB7':'#E8E6FF',background:r.selected?'#534AB7':'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:11,color:'#fff'}}>{r.selected?'✓':''}</div>
                    </div>
                  ))}
                </div>
                <button onClick={doImport} style={{background:'linear-gradient(135deg,#534AB7,#6C5CE7)',color:'#fff',border:'none',borderRadius:12,padding:13,fontFamily:'inherit',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%',marginBottom:8}}>📥 นำเข้า {rows.filter(r=>r.selected).length} รายชื่อ</button>
              </>
            )}
            <button onClick={onClose} style={{background:'#F4F3FF',color:'#534AB7',border:'1.5px solid #E8E6FF',borderRadius:12,padding:12,fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer',width:'100%'}}>ยกเลิก</button>
          </>
        )}
      </div>
    </div>
  );
}

function CRMView({custs,setCusts}){
  const API='https://finovas-crm-production.up.railway.app';
  const [search,setSearch]=useState("");
  const [fType,setFType]=useState("");
  const [fStatus,setFStatus]=useState("");
  const [sel,setSel]=useState(null);
  const [editing,setEditing]=useState(false);
  const [editData,setEditData]=useState({});
  const [showUpsell,setShowUpsell]=useState(false);
  const [upsellData,setUpsellData]=useState({name:'',price:'',status:'unpaid',trend:'warm',note:''});
  const [saving,setSaving]=useState(false);
  const [showFeed,setShowFeed]=useState(false);

  const PLATFORMS=['Facebook','TikTok','Instagram','Google','Referral','Walk-in','อื่นๆ'];
  const PLATFORM_SOCIAL={Facebook:'ชื่อ Facebook',TikTok:'ชื่อ TikTok',Instagram:'ชื่อ Instagram',Referral:'ชื่อคนที่แนะนำ'};
  const TRENDS=[
    {val:'hot',label:'ปิดได้แน่นอน',bg:'#FCEBEB',c:'#791F1F',bc:'#A32D2D'},
    {val:'warm',label:'มีแนวโน้ม',bg:'#FAEEDA',c:'#412402',bc:'#854F0B'},
    {val:'cold',label:'ยังไม่สนใจ',bg:'#E6F1FB',c:'#042C53',bc:'#185FA5'},
    {val:'closed',label:'ปิดได้แล้ว',bg:'#E1F5EE',c:'#04342C',bc:'#0F6E56'},
  ];

  const filtered=custs.filter(c=>{
    const q=search.toLowerCase();
    const matchQ=!q||(c.name||'').toLowerCase().includes(q)||(c.biz||'').toLowerCase().includes(q);
    const matchT=!fType||c.type===fType;
    const matchS=!fStatus||c.status===fStatus;
    return matchQ&&matchT&&matchS;
  });

  function handleImport(imported){
    if(imported.length) setCusts(p=>[...p,...imported]);
    setShowFeed(false);
  }

  async function saveCust(){
    setSaving(true);
    try{
      const res=await fetch(`${API}/api/customers/${sel.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(editData)});
      const updated=await res.json();
      setCusts(p=>p.map(c=>c.id===sel.id?{...c,...mapCust(updated)}:c));
      setSel({...sel,...mapCust(updated)});
      setEditing(false);
    }catch(e){alert('บันทึกไม่สำเร็จ: '+e.message);}
    setSaving(false);
  }

  async function deleteCust(){
    if(!window.confirm('ลบลูกค้ารายนี้?'))return;
    await fetch(`${API}/api/customers/${sel.id}`,{method:'DELETE'});
    setCusts(p=>p.filter(c=>c.id!==sel.id));
    setSel(null);
  }

  async function saveUpsell(){
    if(!upsellData.name){alert('กรุณากรอกชื่อบริการค่ะ');return;}
    setSaving(true);
    try{
      const services=sel.services?JSON.parse(sel.services):[];
      services.push({...upsellData,isUpsell:true,by:upsellData.recommendedBy||''});
      await fetch(`${API}/api/customers/${sel.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({services:JSON.stringify(services)})});
      setCusts(p=>p.map(c=>c.id===sel.id?{...c,services:JSON.stringify(services)}:c));
      setSel({...sel,services:JSON.stringify(services)});
      setShowUpsell(false);
      setUpsellData({name:'',price:'',status:'unpaid',trend:'warm',note:''});
    }catch(e){alert('บันทึกไม่สำเร็จ');}
    setSaving(false);
  }

  const selServices=sel?.services?JSON.parse(sel.services):[];
  const mainRevenue=sel?.price||0;
  const upsellRevenue=selServices.filter(s=>s.isUpsell&&s.status==='paid').reduce((a,s)=>a+(parseInt(s.price)||0),0);

  return(
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>

      {/* Search & Filter */}
      <div style={{padding:"12px 14px",background:C.white,borderBottom:`1px solid ${C.bdr}`,flexShrink:0}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหาชื่อ หรือกิจการ..."
          style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:C.bg,color:C.text,marginBottom:8}}/>
        <div style={{display:"flex",gap:6}}>
          {["","monthly","company","annual"].map((t,i)=>(
            <button key={t} onClick={()=>setFType(t)} style={{flex:1,background:fType===t?"#6C5CE7":"#F4F3FF",color:fType===t?"#fff":"#8B8BAD",border:`1px solid ${fType===t?"#6C5CE7":"#E8E6FF"}`,borderRadius:8,padding:"6px 2px",fontSize:10,cursor:"pointer",fontFamily:"inherit",fontWeight:fType===t?700:400}}>
              {["ทั้งหมด","รายเดือน","จดบริษัท","ยื่นภาษี"][i]}
            </button>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"10px 12px",background:C.bg}}>
        {filtered.length===0&&<div style={{textAlign:"center",color:C.muted,padding:32,fontSize:14}}>ไม่พบลูกค้าค่ะ</div>}

        {/* Customer list */}
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>{setSel(c);setEditing(false);setShowUpsell(false);}}
            style={{background:C.white,borderRadius:12,padding:"12px 14px",marginBottom:8,border:`1px solid ${sel?.id===c.id?"#6C5CE7":C.bdr}`,cursor:"pointer",boxShadow:sel?.id===c.id?"0 0 0 2px #6C5CE720":"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#EEEBff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#6C5CE7",fontSize:16,flexShrink:0}}>{(c.name||'?')[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:13,color:C.text}}>{c.name}</div>
                <div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.biz||'-'} · {c.svc||'-'}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontWeight:700,color:"#00B894",fontSize:13}}>฿{(c.price||0).toLocaleString()}</div>
                <Pill c={c.paid?"#00B894":"#E17055"} bg={c.paid?"#E0FAF4":"#FFF0EB"}>{c.paid?"ชำระแล้ว":"ค้างชำระ"}</Pill>
              </div>
            </div>
          </div>
        ))}

        {/* Detail Panel */}
        {sel && (
          <div style={{background:C.white,borderRadius:14,border:`1px solid #E8E6FF`,marginTop:6,overflow:"hidden"}}>

            {/* Header */}
            <div style={{background:"linear-gradient(135deg,#1E1B4B,#534AB7)",padding:"16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:18,flexShrink:0}}>{(sel.name||'?')[0]}</div>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontWeight:700,fontSize:15}}>{sel.name}</div>
                  <div style={{color:"rgba(255,255,255,.6)",fontSize:11}}>{sel.biz||'-'} · เซลล์: {sel.by||'-'}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>{setEditing(!editing);setEditData({phone:sel.phone||'',phone_emergency:sel.phone_emergency||'',platform:sel.platform||'',social_id:sel.social_id||'',note:sel.note||''});}} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,padding:"5px 10px",color:"#fff",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{editing?"ยกเลิก":"✏️ แก้ไข"}</button>
                  <button onClick={deleteCust} style={{background:"rgba(211,63,63,.3)",border:"none",borderRadius:8,padding:"5px 10px",color:"#fff",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>🗑</button>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"8px 10px"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginBottom:2}}>📞 เบอร์หลัก</div>
                  {editing?(
                    <input value={editData.phone||''} onChange={e=>setEditData({...editData,phone:e.target.value})} placeholder="08X-XXX-XXXX"
                      style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:6,padding:"4px 8px",color:"#fff",fontSize:12,width:"100%",fontFamily:"inherit"}}/>
                  ):(
                    <div style={{fontSize:13,color:"#fff",fontWeight:500}}>{sel.phone||'— ยังไม่มี —'}</div>
                  )}
                </div>
                <div style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"8px 10px"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginBottom:2}}>🆘 ฉุกเฉิน</div>
                  {editing?(
                    <input value={editData.phone_emergency||''} onChange={e=>setEditData({...editData,phone_emergency:e.target.value})} placeholder="08X-XXX-XXXX"
                      style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:6,padding:"4px 8px",color:"#fff",fontSize:12,width:"100%",fontFamily:"inherit"}}/>
                  ):(
                    <div style={{fontSize:13,color:"#fff",fontWeight:500}}>{sel.phone_emergency||'— ยังไม่มี —'}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Platform & Social */}
            <div style={{padding:"14px",borderBottom:`1px solid ${C.bdr}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#534AB7",marginBottom:10}}>📣 ช่องทางและโซเชียล</div>
              {editing?(
                <>
                  <div style={{fontSize:12,color:C.muted,marginBottom:6}}>แพลตฟอร์มที่มา</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                    {PLATFORMS.map(p=>(
                      <button key={p} onClick={()=>setEditData({...editData,platform:p,social_id:''})}
                        style={{border:`1px solid ${editData.platform===p?"#534AB7":C.bdr}`,borderRadius:8,padding:"6px 10px",fontSize:11,background:editData.platform===p?"#534AB7":C.white,color:editData.platform===p?"#fff":C.muted,cursor:"pointer",fontFamily:"inherit",fontWeight:editData.platform===p?700:400}}>
                        {p}
                      </button>
                    ))}
                  </div>
                  {editData.platform&&PLATFORM_SOCIAL[editData.platform]&&(
                    <input value={editData.social_id||''} onChange={e=>setEditData({...editData,social_id:e.target.value})}
                      placeholder={PLATFORM_SOCIAL[editData.platform]}
                      style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:C.bg,color:C.text}}/>
                  )}
                  {editData.platform==='อื่นๆ'&&(
                    <input value={editData.social_id||''} onChange={e=>setEditData({...editData,social_id:e.target.value})}
                      placeholder="ระบุแพลตฟอร์ม + ชื่อโปรไฟล์..."
                      style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:C.bg,color:C.text,marginTop:6}}/>
                  )}
                </>
              ):(
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <div style={{background:"#EEEBff",borderRadius:10,padding:"8px 12px",flex:1}}>
                    <div style={{fontSize:10,color:"#8B8BAD",marginBottom:2}}>แพลตฟอร์ม</div>
                    <div style={{fontSize:13,fontWeight:600,color:"#26215C"}}>{sel.platform||'— ยังไม่มี —'}</div>
                  </div>
                  <div style={{background:"#EEEBff",borderRadius:10,padding:"8px 12px",flex:1}}>
                    <div style={{fontSize:10,color:"#8B8BAD",marginBottom:2}}>ชื่อโซเชียล</div>
                    <div style={{fontSize:13,fontWeight:600,color:"#26215C"}}>{sel.social_id||'— ยังไม่มี —'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div style={{padding:"14px",borderBottom:`1px solid ${C.bdr}`}}>
              <div style={{fontSize:11,fontWeight:700,color:"#534AB7",marginBottom:10}}>💼 บริการและการชำระ</div>
              {/* Main service */}
              <div style={{background:"#E6F1FB",borderRadius:10,padding:"10px 12px",marginBottom:8,borderLeft:"3px solid #185FA5"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#042C53"}}>{sel.svc||'—'}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#185FA5"}}>฿{(sel.price||0).toLocaleString()}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <Pill c={sel.paid?"#0F6E56":"#633806"} bg={sel.paid?"#E1F5EE":"#FAEEDA"}>{sel.paid?"✅ ชำระแล้ว":"⏳ ยังไม่ชำระ"}</Pill>
                </div>
              </div>
              {/* Upsell items */}
              {selServices.filter(s=>s.isUpsell).map((s,i)=>(
                <div key={i} style={{background:"#E1F5EE",borderRadius:10,padding:"10px 12px",marginBottom:8,borderLeft:"3px solid #0F6E56"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div>
                      <div style={{fontSize:10,color:"#0F6E56",fontWeight:600,marginBottom:1}}>⭐ Upsell</div>
                      <div style={{fontSize:12,fontWeight:600,color:"#04342C"}}>{s.name}</div>
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:"#0F6E56"}}>฿{(parseInt(s.price)||0).toLocaleString()}</div>
                  </div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Pill c={s.status==='paid'?"#0F6E56":"#633806"} bg={s.status==='paid'?"#E1F5EE":"#FAEEDA"}>{s.status==='paid'?"✅ ชำระแล้ว":"⏳ ยังไม่ชำระ"}</Pill>
                    {s.trend&&<Pill c="#534AB7" bg="#EEEBff">{TRENDS.find(t=>t.val===s.trend)?.label||s.trend}</Pill>}
                    {s.note&&<div style={{fontSize:10,color:"#1D9E75",marginTop:3,fontStyle:"italic",width:"100%"}}>{s.note}</div>}
                  </div>
                </div>
              ))}
              {/* Add upsell button */}
              <button onClick={()=>setShowUpsell(!showUpsell)}
                style={{width:"100%",background:"#F4F3FF",color:"#534AB7",border:"1px dashed #AFA9EC",borderRadius:10,padding:10,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:showUpsell?10:0}}>
                {showUpsell?"ปิด ↑":"+ เพิ่ม Upsell / บริการเพิ่มเติม"}
              </button>
              {/* Upsell form */}
              {showUpsell&&(
                <div style={{background:"#F0FFF8",borderRadius:12,border:"1px solid #5DCAA5",padding:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#0F6E56",marginBottom:10}}>⭐ เพิ่ม Upsell ใหม่</div>
                  <div style={{marginBottom:8}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:4}}>ชื่อบริการ *</div>
                    <input value={upsellData.name} onChange={e=>setUpsellData({...upsellData,name:e.target.value})} placeholder="เช่น วางแผนภาษี, ออดิต..."
                      style={{width:"100%",border:`1px solid #5DCAA5`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    <div>
                      <div style={{fontSize:12,color:C.muted,marginBottom:4}}>ราคา (บาท)</div>
                      <input type="number" value={upsellData.price} onChange={e=>setUpsellData({...upsellData,price:e.target.value})} placeholder="5,000"
                        style={{width:"100%",border:`1px solid #5DCAA5`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text}}/>
                    </div>
                    <div>
                      <div style={{fontSize:12,color:C.muted,marginBottom:4}}>สถานะชำระ</div>
                      <select value={upsellData.status} onChange={e=>setUpsellData({...upsellData,status:e.target.value})}
                        style={{width:"100%",border:`1px solid #5DCAA5`,borderRadius:10,padding:"9px 12px",fontSize:12,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text,appearance:"none"}}>
                        <option value="unpaid">⏳ ยังไม่ชำระ</option>
                        <option value="paid">✅ ชำระแล้ว</option>
                        <option value="partial">💳 ชำระบางส่วน</option>
                      </select>
                    </div>
                  </div>
                  <div style={{marginBottom:8}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:6}}>แนวโน้มปิด Upsell</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {TRENDS.map(t=>(
                        <button key={t.val} onClick={()=>setUpsellData({...upsellData,trend:t.val})}
                          style={{border:`1px solid ${upsellData.trend===t.val?t.bc:C.bdr}`,borderRadius:8,padding:"6px 10px",fontSize:11,background:upsellData.trend===t.val?t.bg:"#fff",color:upsellData.trend===t.val?t.c:C.muted,cursor:"pointer",fontFamily:"inherit",fontWeight:upsellData.trend===t.val?700:400}}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:8}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:4}}>หมายเหตุ / รายละเอียด</div>
                    <textarea value={upsellData.note} onChange={e=>setUpsellData({...upsellData,note:e.target.value})} placeholder="รายละเอียดเพิ่มเติม..."
                      style={{width:"100%",border:`1px solid #5DCAA5`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:C.text,minHeight:60,resize:"vertical"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <button onClick={()=>setShowUpsell(false)} style={{border:`1px solid ${C.bdr}`,borderRadius:10,padding:10,fontSize:12,color:C.muted,background:C.surf,cursor:"pointer",fontFamily:"inherit"}}>ยกเลิก</button>
                    <button onClick={saveUpsell} disabled={saving} style={{border:"none",borderRadius:10,padding:10,fontSize:12,color:"#04342C",background:"#E1F5EE",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>{saving?"⏳...":"💾 บันทึก Upsell"}</button>
                  </div>
                </div>
              )}
            </div>

            {/* ยอดรวม */}
            <div style={{background:"#1E1B4B",padding:"12px 14px"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:8}}>ยอดรวมลูกค้ารายนี้ · เซลล์: {sel.by||'-'}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                <div style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:10}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:2}}>บริการหลัก</div>
                  <div style={{fontSize:14,fontWeight:700,color:"#9FE1CB"}}>฿{mainRevenue.toLocaleString()}</div>
                </div>
                <div style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:10}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:2}}>Upsell</div>
                  <div style={{fontSize:14,fontWeight:700,color:"#AFA9EC"}}>฿{upsellRevenue.toLocaleString()}</div>
                </div>
                <div style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:10}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:2}}>รวมทั้งหมด</div>
                  <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>฿{(mainRevenue+upsellRevenue).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Save button */}
            {editing&&(
              <div style={{padding:"12px 14px",borderTop:`1px solid ${C.bdr}`}}>
                <button onClick={saveCust} disabled={saving} style={{width:"100%",background:"linear-gradient(135deg,#534AB7,#6C5CE7)",color:"#fff",border:"none",borderRadius:12,padding:12,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                  {saving?"⏳ กำลังบันทึก...":"💾 บันทึกการแก้ไข"}
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}


function PipelineView({custs}){
  const cols={};custs.forEach(c=>{if(!cols[c.pipe])cols[c.pipe]=[];cols[c.pipe].push(c);});
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:8}}>Sales pipeline — แมน + พิม</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {PIPE_COLS.map(col=>{
          const items=cols[col.key]||[];
          if(!items.length&&col.key!=="นัดคุย")return null;
          return(
            <div key={col.key} style={{background:C.white,borderRadius:10,border:`0.5px solid ${C.bdr}`,overflow:"hidden"}}>
              <div style={{background:col.c,color:"#fff",padding:"7px 11px",fontSize:11,fontWeight:500}}>{col.key} ({items.length})</div>
              {items.length===0 && <div style={{padding:10,fontSize:11,color:"var(--color-text-tertiary)",textAlign:"center"}}>ว่าง</div>}
              {items.map(c=>(
                <div key={c.id} style={{padding:"8px 10px",borderBottom:`0.5px solid ${C.bdr}`,fontSize:11}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13,color:"var(--color-text-primary)"}}>{c.name}</div>
                      <div style={{color:C.muted,fontSize:12,marginTop:2}}>{c.svc||c.biz||'-'}</div>
                      {c.price>0 && <div style={{color:C.green,fontSize:10,fontWeight:500}}>฿{c.price.toLocaleString()}</div>}
                      <div style={{color:"var(--color-text-tertiary)",fontSize:9}}>{c.by}</div>
                    </div>
                    {col.key==='รอโทร' && (
                      <button onClick={async()=>{
                        if(!window.confirm('ลบ '+c.name+' ออกจากรายชื่อรอโทร?')) return;
                        await fetch('https://finovas-crm-production.up.railway.app/api/customers/'+c.id,{method:'DELETE'});
                        window.location.reload();
                      }} style={{background:'#FCEBEB',border:'none',borderRadius:6,padding:'3px 8px',fontSize:10,color:'#A32D2D',fontWeight:700,cursor:'pointer',flexShrink:0,marginLeft:6}}>ลบ</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Sales Targets ─────────────────────────────────────────────────────────────
function TargetsView(){
  const API = 'https://finovas-crm-production.up.railway.app';
  const [targets, setTargets] = React.useState([]);
  const [custs, setCusts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAdd, setShowAdd] = React.useState(false);
  const [form, setForm] = React.useState({sales_name:'',target_type:'',target_value:''});

  React.useEffect(()=>{
    Promise.all([
      fetch(`${API}/api/sales-targets`).then(r=>r.json()),
      fetch(`${API}/api/customers`).then(r=>r.json()),
    ]).then(([t,c])=>{
      setTargets(Array.isArray(t)?t:[]);
      setCusts(Array.isArray(c)?c:[]);
      setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  const colors = ['#1D9E75','#534AB7','#185FA5','#BA7517','#A32D2D'];
  const salesNames = [...new Set(targets.map(t=>t.sales_name))];

  function getCurrent(salesName, targetType) {
    const type = targetType.toLowerCase();
    return custs.filter(c => c.by === salesName && (
      (type.includes('รายเดือน') && c.type==='monthly') ||
      (type.includes('จดบริษัท') || type.includes('หจก') && c.type==='company') ||
      (type.includes('ภาษี') && c.type==='annual') ||
      true
    ) && c.status === 'B').length;
  }

  async function addTarget(){
    if(!form.sales_name||!form.target_type||!form.target_value) return;
    const res = await fetch(`${API}/api/sales-targets`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ sales_name:form.sales_name, target_type:form.target_type, target_value:parseInt(form.target_value), current_value:0, period:'monthly' })
    });
    const data = await res.json();
    setTargets(p=>[...p, data]);
    setForm({sales_name:'',target_type:'',target_value:''});
    setShowAdd(false);
  }

  async function updateTarget(id, current_value){
    await fetch(`${API}/api/sales-targets/${id}`,{
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ current_value })
    });
    setTargets(p=>p.map(t=>t.id===id?{...t,current_value}:t));
  }

  if(loading) return <div style={{padding:32,textAlign:'center',color:C.muted}}>กำลังโหลด...</div>;

  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--color-text-primary)"}}>เป้าหมายเซลล์</div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{background:C.teal,color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>
          {showAdd?'ยกเลิก':'+ เพิ่มเป้า'}
        </button>
      </div>

      {showAdd && (
        <Card style={{marginBottom:14,background:C.tealBg,border:`1px solid ${C.teal}40`}}>
          <CTitle>เพิ่มเป้าหมายใหม่</CTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
            <div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>ชื่อเซลล์</div>
              <input value={form.sales_name} onChange={e=>setForm(f=>({...f,sales_name:e.target.value}))} placeholder="แมน / พิม"
                style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:8,padding:"8px 10px",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
            </div>
            <div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>ประเภทเป้า</div>
              <input value={form.target_type} onChange={e=>setForm(f=>({...f,target_type:e.target.value}))} placeholder="บัญชีรายเดือน"
                style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:8,padding:"8px 10px",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
            </div>
            <div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>เป้า (ราย)</div>
              <input type="number" value={form.target_value} onChange={e=>setForm(f=>({...f,target_value:e.target.value}))} placeholder="500"
                style={{width:"100%",border:`1px solid ${C.bdr}`,borderRadius:8,padding:"8px 10px",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
            </div>
          </div>
          <button onClick={addTarget} style={{background:C.teal,color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:13}}>
            บันทึกเป้า
          </button>
        </Card>
      )}

      {salesNames.length===0 && <Card><div style={{textAlign:"center",color:C.muted,padding:20}}>ยังไม่มีเป้าหมาย กด "+ เพิ่มเป้า" ได้เลยค่ะ</div></Card>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {salesNames.map((name,ni)=>{
          const myTargets = targets.filter(t=>t.sales_name===name);
          const color = colors[ni % colors.length];
          const totT = myTargets.reduce((s,t)=>s+(t.target_value||0),0);
          const totD = myTargets.reduce((s,t)=>s+(t.current_value||0),0);
          return(
            <Card key={name}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color,fontSize:15}}>{name[0]}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:"var(--color-text-primary)"}}>{name}</div>
                  <div style={{fontSize:11,color}}>ภาพรวม {pct(totD,totT)}%</div>
                </div>
              </div>
              {myTargets.map(t=>{
                const d = t.current_value||0;
                const tv = t.target_value||0;
                const p = pct(d,tv);
                const c = p>=80?C.green:p>=50?C.amber:C.red;
                return(
                  <div key={t.id} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                      <span style={{color:"var(--color-text-primary)",fontWeight:500}}>{t.target_type}</span>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{color:c,fontWeight:600}}>{d}/{tv} ราย ({p}%)</span>
                        <input type="number" defaultValue={d} onBlur={e=>updateTarget(t.id,parseInt(e.target.value)||0)}
                          style={{width:50,border:`1px solid ${C.bdr}`,borderRadius:6,padding:"2px 6px",fontSize:11,fontFamily:"inherit",outline:"none",textAlign:"center"}}/>
                      </div>
                    </div>
                    <div style={{height:8,background:"var(--color-background-secondary)",borderRadius:4,overflow:"hidden"}}>
                      <div style={{width:`${p}%`,height:"100%",background:c,borderRadius:4,transition:"width .3s"}}/>
                    </div>
                  </div>
                );
              })}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Churn View ────────────────────────────────────────────────────────────────
function ChurnView(){
  const API = 'https://finovas-crm-production.up.railway.app';
  const [churnList, setChurnList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(()=>{
    fetch(`${API}/api/customers`)
      .then(r=>r.json())
      .then(data=>{
        const churned = (Array.isArray(data)?data:[])
          .filter(c=>c.status==='D')
          .map(c=>({
            name: c.name||'',
            svc: c.service||c.svc||'-',
            reason: c.churn_reason||'ไม่ระบุ',
            month: c.updated_at ? new Date(c.updated_at).toLocaleDateString('th-TH',{month:'short'}) : '-',
          }));
        setChurnList(churned);
        setLoading(false);
      }).catch(()=>setLoading(false));
  },[]);

  const reasons={};
  churnList.forEach(c=>{reasons[c.reason]=(reasons[c.reason]||0)+1;});

  if(loading) return <div style={{padding:32,textAlign:"center",color:C.muted}}>กำลังโหลด...</div>;

  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:13,fontWeight:600,color:"var(--color-text-primary)",marginBottom:12}}>วิเคราะห์สาเหตุลูกค้าออก</div>
      {churnList.length===0 && <Card><div style={{textAlign:"center",color:C.muted,padding:20}}>ยังไม่มีลูกค้าที่ออกไปค่ะ 🎉</div></Card>}
      {Object.keys(reasons).length>0 && (
        <Card>
          <CTitle>สาเหตุหลัก</CTitle>
          {Object.entries(reasons).sort((a,b)=>b[1]-a[1]).map(([r,n])=><BarRow key={r} label={r} val={n} total={churnList.length} color={C.red} lw={80}/>)}
        </Card>
      )}
      {churnList.length>0 && (
        <Card>
          <CTitle>รายละเอียด ({churnList.length} ราย)</CTitle>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,tableLayout:"fixed"}}>
            <thead>
              <tr style={{borderBottom:`1px solid ${C.bdr}`,background:C.surf}}>
                {["ชื่อ","บริการ","สาเหตุ","เดือน"].map(h=>(
                  <th key={h} style={{padding:"8px 10px",textAlign:"left",fontSize:12,fontWeight:600,color:C.muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {churnList.map((c,i)=>(
                <tr key={i} style={{borderBottom:`0.5px solid ${C.bdr}`,background:i%2===0?"var(--color-background-primary)":"var(--color-background-secondary)"}}>
                  <td style={{padding:"10px 10px",fontWeight:600,color:"var(--color-text-primary)",fontSize:13}}>{c.name}</td>
                  <td style={{padding:"10px 10px",color:C.muted,fontSize:12}}>{c.svc}</td>
                  <td style={{padding:"10px 10px"}}><Pill c={C.red} bg={C.redBg}>{c.reason}</Pill></td>
                  <td style={{padding:"10px 10px",color:C.muted,fontSize:12}}>{c.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ── CRM View ──────────────────────────────────────────────────────────────────

// ── ใบรับงาน View ─────────────────────────────────────────────────────────────
function SecFormsView(){
  const [forms, setForms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sel, setSel] = React.useState(null);
  const API = 'https://finovas-crm-production.up.railway.app';

  React.useEffect(()=>{
    fetch(`${API}/api/sec-forms`)
      .then(r=>r.json())
      .then(d=>{ setForms(Array.isArray(d)?d:[]); setLoading(false); })
      .catch(()=>setLoading(false));
  },[]);

  const TYPE_LABEL = {monthly:'📅 ทำรายเดือน', company:'🏢 จดบริษัท', annual:'📋 ยื่นภาษี'};
  const TYPE_C = {monthly:C.teal, company:C.purple, annual:C.amber};
  const TYPE_BG = {monthly:C.tealBg, company:C.purpleBg, annual:C.amberBg};

  function printForm(form){
    const d = form.data || {};
    const win = window.open('','_blank');
    const typeLabel = TYPE_LABEL[form.form_type] || form.form_type;
    let rows = '';
    const skip = ['form_type','submitted_by'];
    const labels = {
      name:'ชื่อลูกค้า', biz:'ชื่อกิจการ', date:'วันที่', account_id:'Account ID',
      tel:'เบอร์ติดต่อ', detail:'รายละเอียดธุรกิจ', price:'ค่าบริการ', pay_status:'สถานะชำระ',
      doc_type:'ประเภทเอกสาร', note:'หมายเหตุ', sender:'ผู้ส่งเรื่อง', receiver:'ผู้รับเรื่อง',
      contact:'ชื่อผู้ติดต่อ', company_name:'ชื่อบริษัท', address:'ที่อยู่', vat:'VAT',
      social:'ประกันสังคม', capital:'ทุนจดทะเบียน', capital_pct:'ชำระ(%)',
      authority:'อำนาจกรรมการ', obj1:'วัตถุประสงค์ที่ 1', obj2:'วัตถุประสงค์ที่ 2',
      tax_name:'ยื่นภาษีในชื่อ', marital:'สถานะ', filed_before:'เคยยื่นภาษี',
      prev_user:'Username', has_statement:'มี Statement',
      income_note:'อธิบายธุรกิจ', line_acc:'Line Account',
    };
    Object.entries(d).forEach(([k,v])=>{
      if(skip.includes(k)||!v||v===''||v===false) return;
      if(typeof v === 'object') return;
      const label = labels[k]||k;
      rows += `<tr><td style="padding:6px 12px;color:#666;width:40%;border-bottom:1px solid #eee">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${v}</td></tr>`;
    });
    if(d.directors?.length) {
      d.directors.forEach((dir,i)=>{
        rows += `<tr><td style="padding:6px 12px;color:#666;border-bottom:1px solid #eee">กรรมการที่ ${i+1}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${dir.name||''} ${dir.tel?'โทร '+dir.tel:''} ${dir.email||''}</td></tr>`;
      });
    }
    if(d.shareholders?.length) {
      d.shareholders.forEach((sh,i)=>{
        rows += `<tr><td style="padding:6px 12px;color:#666;border-bottom:1px solid #eee">ผู้ถือหุ้นที่ ${i+1}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${sh.name||''} ${sh.shares?sh.shares+'%':''} ${sh.tel?'โทร '+sh.tel:''}</td></tr>`;
      });
    }
    if(d.incomes?.length) {
      rows += `<tr><td style="padding:6px 12px;color:#666;border-bottom:1px solid #eee">รายได้</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${d.incomes.join(', ')}</td></tr>`;
    }
    if(d.deductions?.length) {
      rows += `<tr><td style="padding:6px 12px;color:#666;border-bottom:1px solid #eee">ลดหย่อน</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${d.deductions.join(', ')}</td></tr>`;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>ใบรับงาน</title>
    <style>body{font-family:sans-serif;padding:32px;max-width:700px;margin:0 auto}
    h1{font-size:20px;margin-bottom:4px}
    .sub{color:#666;font-size:13px;margin-bottom:20px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    .footer{margin-top:40px;display:flex;justify-content:space-between;font-size:12px;color:#666}
    .sign{border-top:1px solid #333;padding-top:8px;min-width:160px;text-align:center}
    @media print{button{display:none}}
    </style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <h1>${typeLabel}</h1>
        <div class="sub">Finovas Accounting · วันที่ ${d.date||new Date().toLocaleDateString('th-TH')} · กรอกโดย ${form.submitted_by||'เลขา'}</div>
      </div>
      <button onclick="window.print()" style="background:#1D9E75;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:13px">🖨️ พิมพ์ / บันทึก PDF</button>
    </div>
    <table><tbody>${rows}</tbody></table>
    <div class="footer">
      <div class="sign"><br/>ผู้ส่งเรื่อง (เซลล์)<br/>${d.sender||'..................'}</div>
      <div class="sign"><br/>ผู้รับเรื่อง (เลขา)<br/>${d.receiver||'..................'}</div>
      <div class="sign"><br/>ผู้รับงาน (บัญชี)<br/>..................</div>
    </div>
    </body></html>`);
    win.document.close();
    setTimeout(()=>win.print(),500);
  }

  if(loading) return <div style={{padding:32,textAlign:'center',color:C.muted}}>กำลังโหลด...</div>;

  return(
    <div style={{padding:12,overflowY:'auto',flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:8}}>ใบรับงานทั้งหมด — กดปริ้นได้เลยค่ะ</div>
      {forms.length===0 && <Card><div style={{textAlign:'center',color:C.muted,padding:20}}>ยังไม่มีใบรับงานค่ะ</div></Card>}
      {forms.map(f=>(
        <Card key={f.id} style={{cursor:'pointer',borderLeft:`3px solid ${TYPE_C[f.form_type]||C.teal}`}} >
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4}}>
                <Pill c={TYPE_C[f.form_type]||C.teal} bg={TYPE_BG[f.form_type]||C.tealBg}>{TYPE_LABEL[f.form_type]||f.form_type}</Pill>
                <span style={{fontWeight:500,fontSize:12,color:'var(--color-text-primary)'}}>{f.customer_name}</span>
              </div>
              <div style={{fontSize:11,color:C.muted}}>{f.biz_name} · กรอกโดย {f.submitted_by}</div>
              <div style={{fontSize:10,color:C.muted,marginTop:2}}>{new Date(f.created_at).toLocaleString('th-TH')}</div>
            </div>
            <button onClick={()=>printForm(f)} style={{background:C.teal,color:'#fff',border:'none',borderRadius:8,padding:'8px 14px',cursor:'pointer',fontFamily:'inherit',fontWeight:500,fontSize:12,flexShrink:0}}>🖨️ ปริ้น</button>
          </div>
        </Card>
      ))}
    </div>
  );
}

const API_URL = 'https://finovas-crm-production.up.railway.app';






// ── เป้าหมายเซลล์ View ─────────────────────────────────────────────────────
function SalesTargetView(){
  const API='https://finovas-crm-production.up.railway.app';
  const [targets,setTargets]=React.useState([]);
  const [loading,setLoading]=React.useState(true);
  const [editName,setEditName]=React.useState('');
  const [form,setForm]=React.useState({target_revenue:'',target_monthly:'',target_tax:'',target_company:''});
  const [saving,setSaving]=React.useState(false);

  const load=()=>{
    fetch(API+'/api/sales-targets-detail').then(r=>r.json()).then(d=>{setTargets(Array.isArray(d)?d:[]);setLoading(false);}).catch(()=>setLoading(false));
  };
  React.useEffect(()=>{load();},[]);

  const handleEdit=(t)=>{
    setEditName(t.sales_name);
    setForm({target_revenue:t.target_revenue||'',target_monthly:t.target_monthly||'',target_tax:t.target_tax||'',target_company:t.target_company||''});
  };

  const handleSave=async()=>{
    if(!editName) return;
    setSaving(true);
    await fetch(API+'/api/sales-targets-detail',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sales_name:editName,...form})});
    setSaving(false); setEditName(''); load();
  };

  const pct=(a,t)=>t>0?Math.min(100,Math.round(a/t*100)):0;
  const barColor=(p)=>p>=90?'#0F6E56':p>=60?'#534AB7':'#E17055';

  if(loading) return <div style={{padding:24,textAlign:'center',color:'#8B8BAD'}}>กำลังโหลด...</div>;

  const total_rev = targets.reduce((a,t)=>a+(t.actual_revenue||0),0);
  const total_rev_target = targets.reduce((a,t)=>a+(t.target_revenue||0),0);
  const total_monthly = targets.reduce((a,t)=>a+(t.actual_monthly||0),0);
  const total_tax = targets.reduce((a,t)=>a+(t.actual_tax||0),0);
  const total_company = targets.reduce((a,t)=>a+(t.actual_company||0),0);

  return(
    <div style={{flex:1,overflow:'auto',background:'#F4F3FF',padding:'16px 20px'}}>
      <div style={{fontSize:14,fontWeight:700,color:'#534AB7',marginBottom:4}}>🎯 เป้าหมายเซลล์</div>
      <div style={{fontSize:12,color:'#8B8BAD',marginBottom:16}}>ยอดเงิน + จำนวนหัว 3 บริการ</div>

      {/* ภาพรวม */}
      <div style={{background:'#fff',borderRadius:16,padding:14,marginBottom:12,border:'1px solid #E8E6FF'}}>
        <div style={{fontSize:12,fontWeight:700,color:'#8B8BAD',marginBottom:10}}>📊 ภาพรวมทีม</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
          <div style={{background:'#F4F3FF',borderRadius:10,padding:10,textAlign:'center'}}>
            <div style={{fontSize:18,fontWeight:800,color:'#534AB7'}}>฿{total_rev.toLocaleString()}</div>
            <div style={{fontSize:10,color:'#8B8BAD'}}>จาก ฿{total_rev_target.toLocaleString()}</div>
          </div>
          <div style={{background:'#E1F5EE',borderRadius:10,padding:10,textAlign:'center'}}>
            <div style={{fontSize:18,fontWeight:800,color:'#0F6E56'}}>{pct(total_rev,total_rev_target)}%</div>
            <div style={{fontSize:10,color:'#8B8BAD'}}>ยอดรวมทีม</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6}}>
          <div style={{background:'#EEEBff',borderRadius:8,padding:8,textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#534AB7'}}>{total_monthly}</div>
            <div style={{fontSize:9,color:'#8B8BAD'}}>ทำบัญชี</div>
          </div>
          <div style={{background:'#E6F1FB',borderRadius:8,padding:8,textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#0C447C'}}>{total_tax}</div>
            <div style={{fontSize:9,color:'#8B8BAD'}}>ยื่นภาษี</div>
          </div>
          <div style={{background:'#FFF3E0',borderRadius:8,padding:8,textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#633806'}}>{total_company}</div>
            <div style={{fontSize:9,color:'#8B8BAD'}}>จดบริษัท</div>
          </div>
        </div>
      </div>

      {/* รายบุคคล */}
      {targets.map((t,i)=>{
        const p=pct(t.actual_revenue,t.target_revenue);
        const col=barColor(p);
        return(
          <div key={i} style={{background:'#fff',borderRadius:16,padding:14,marginBottom:10,border:'1px solid #E8E6FF'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <div style={{width:38,height:38,borderRadius:'50%',background:'#EEEBff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:15,color:'#534AB7',flexShrink:0}}>
                {(t.sales_name||'?').slice(2,4)||(t.sales_name||'?').slice(0,2)}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:'#1E1B4B'}}>{t.sales_name}</div>
                <div style={{fontSize:11,color:'#8B8BAD'}}>฿{(t.actual_revenue||0).toLocaleString()} / ฿{(t.target_revenue||0).toLocaleString()}</div>
                <div style={{height:5,background:'#F0EFF8',borderRadius:3,marginTop:4,overflow:'hidden'}}>
                  <div style={{height:'100%',width:p+'%',background:col,borderRadius:3,transition:'width .5s'}}/>
                </div>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:col}}>{p}%</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:8}}>
              <div style={{background:'#EEEBff',borderRadius:8,padding:6,textAlign:'center'}}>
                <div style={{fontSize:12,fontWeight:700,color:'#534AB7'}}>{t.actual_monthly||0}/{t.target_monthly||0}</div>
                <div style={{fontSize:9,color:'#8B8BAD'}}>ทำบัญชี</div>
              </div>
              <div style={{background:'#E6F1FB',borderRadius:8,padding:6,textAlign:'center'}}>
                <div style={{fontSize:12,fontWeight:700,color:'#0C447C'}}>{t.actual_tax||0}/{t.target_tax||0}</div>
                <div style={{fontSize:9,color:'#8B8BAD'}}>ยื่นภาษี</div>
              </div>
              <div style={{background:'#FFF3E0',borderRadius:8,padding:6,textAlign:'center'}}>
                <div style={{fontSize:12,fontWeight:700,color:'#633806'}}>{t.actual_company||0}/{t.target_company||0}</div>
                <div style={{fontSize:9,color:'#8B8BAD'}}>จดบริษัท</div>
              </div>
            </div>
            <button onClick={()=>handleEdit(t)} style={{background:'#F4F3FF',border:'1.5px solid #E8E6FF',borderRadius:8,padding:'6px 12px',fontSize:11,fontWeight:600,color:'#534AB7',cursor:'pointer',width:'100%'}}>✏️ แก้ไขเป้าหมาย</button>
          </div>
        );
      })}

      {/* ฟอร์มแก้ไข */}
      {editName&&(
        <div style={{background:'#fff',borderRadius:16,padding:14,marginBottom:12,border:'2px solid #534AB7'}}>
          <div style={{fontSize:13,fontWeight:700,color:'#534AB7',marginBottom:12}}>✏️ แก้ไขเป้า — {editName}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
            <div>
              <div style={{fontSize:10,color:'#8B8BAD',marginBottom:3}}>ยอดเงิน (฿/เดือน)</div>
              <input type="number" value={form.target_revenue} onChange={e=>setForm({...form,target_revenue:e.target.value})} style={{border:'1.5px solid #E8E6FF',borderRadius:8,padding:'7px 10px',fontSize:12,width:'100%',outline:'none'}} placeholder="30000"/>
            </div>
            <div>
              <div style={{fontSize:10,color:'#8B8BAD',marginBottom:3}}>ทำบัญชีรายเดือน (ราย)</div>
              <input type="number" value={form.target_monthly} onChange={e=>setForm({...form,target_monthly:e.target.value})} style={{border:'1.5px solid #E8E6FF',borderRadius:8,padding:'7px 10px',fontSize:12,width:'100%',outline:'none'}} placeholder="10"/>
            </div>
            <div>
              <div style={{fontSize:10,color:'#8B8BAD',marginBottom:3}}>ยื่นภาษีบุคคล (ราย)</div>
              <input type="number" value={form.target_tax} onChange={e=>setForm({...form,target_tax:e.target.value})} style={{border:'1.5px solid #E8E6FF',borderRadius:8,padding:'7px 10px',fontSize:12,width:'100%',outline:'none'}} placeholder="3"/>
            </div>
            <div>
              <div style={{fontSize:10,color:'#8B8BAD',marginBottom:3}}>จดบริษัท/หจก. (ราย)</div>
              <input type="number" value={form.target_company} onChange={e=>setForm({...form,target_company:e.target.value})} style={{border:'1.5px solid #E8E6FF',borderRadius:8,padding:'7px 10px',fontSize:12,width:'100%',outline:'none'}} placeholder="2"/>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={handleSave} disabled={saving} style={{flex:1,background:'linear-gradient(135deg,#534AB7,#6C5CE7)',color:'#fff',border:'none',borderRadius:10,padding:10,fontSize:13,fontWeight:700,cursor:'pointer'}}>
              {saving?'กำลังบันทึก...':'💾 บันทึก'}
            </button>
            <button onClick={()=>setEditName('')} style={{background:'#F4F3FF',border:'1.5px solid #E8E6FF',borderRadius:10,padding:'10px 16px',fontSize:13,cursor:'pointer',color:'#8B8BAD'}}>ยกเลิก</button>
          </div>
        </div>
      )}

      {/* เพิ่มเซลล์ใหม่ */}
      {!editName&&(
        <button onClick={()=>{setEditName('ใหม่');setForm({target_revenue:'',target_monthly:'',target_tax:'',target_company:''});}} style={{background:'#534AB7',color:'#fff',border:'none',borderRadius:12,padding:'11px 16px',fontSize:13,fontWeight:700,cursor:'pointer',width:'100%',marginTop:4}}>
          ➕ เพิ่มเซลล์ใหม่
        </button>
      )}
    </div>
  );
}

// ── ประเมินทีมบัญชี View ────────────────────────────────────────────────────
function AccountantPerfView(){
  const API='https://finovas-crm-production.up.railway.app';
  const [data,setData]=React.useState([]);
  const [loading,setLoading]=React.useState(true);

  React.useEffect(()=>{
    fetch(API+'/api/accountant-performance')
      .then(r=>r.json()).then(d=>{ if(d.data) setData(d.data); setLoading(false); })
      .catch(()=>setLoading(false));
  },[]);

  const getScoreColor=(label)=>{
    if(!label||label==='-') return {bg:'#F4F3FF',c:'#8B8BAD'};
    if(label.includes('ดีมาก')||label.includes('เร็วมาก')) return {bg:'#E1F5EE',c:'#085041'};
    if(label.includes('พอใช้')||label.includes('ปกติ')) return {bg:'#E6F1FB',c:'#0C447C'};
    return {bg:'#FCEBEB',c:'#791F1F'};
  };

  if(loading) return <div style={{padding:24,textAlign:'center',color:'#8B8BAD'}}>กำลังโหลดข้อมูล...</div>;

  return(
    <div style={{flex:1,overflow:'auto',background:'#F4F3FF',padding:'16px 20px'}}>
      <div style={{fontSize:14,fontWeight:700,color:'#534AB7',marginBottom:4}}>📊 ประเมินทีมบัญชี</div>
      <div style={{fontSize:12,color:'#8B8BAD',marginBottom:16}}>วิเคราะห์จากแชทในกลุ่ม LINE + LINE OA บัญชี (7 วันย้อนหลัง)</div>

      {data.length===0&&<div style={{textAlign:'center',color:'#8B8BAD',padding:32}}>ยังไม่มีข้อมูลค่ะ</div>}

      {data.map((d,i)=>{
        const respCol=getScoreColor(d.response_label);
        const sentCol=getScoreColor(d.sentiment_label);
        return(
          <div key={i} style={{background:'#fff',borderRadius:16,padding:16,marginBottom:12,border:'1px solid #E8E6FF',boxShadow:'0 1px 4px rgba(83,74,183,.06)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <div style={{width:40,height:40,borderRadius:50,background:'#EEEBff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16,color:'#534AB7',flexShrink:0}}>
                {(d.accountant.name||'?').slice(2,4)||(d.accountant.name||'?').slice(0,2)}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:'#1E1B4B'}}>{d.accountant.name}</div>
                <div style={{fontSize:12,color:'#8B8BAD'}}>💬 ข้อความทั้งหมด: {d.total_messages} ครั้ง</div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              <div style={{background:respCol.bg,borderRadius:12,padding:'10px 12px'}}>
                <div style={{fontSize:10,color:'#8B8BAD',marginBottom:4}}>⏱ ความเร็วตอบ</div>
                <div style={{fontSize:13,fontWeight:700,color:respCol.c}}>{d.response_label||'-'}</div>
                {d.avg_response_sec&&<div style={{fontSize:11,color:'#8B8BAD',marginTop:2}}>{Math.round(d.avg_response_sec/60)} นาที/ครั้ง</div>}
              </div>
              <div style={{background:sentCol.bg,borderRadius:12,padding:'10px 12px'}}>
                <div style={{fontSize:10,color:'#8B8BAD',marginBottom:4}}>💬 โทนการตอบ</div>
                <div style={{fontSize:13,fontWeight:700,color:sentCol.c}}>{d.sentiment_label||'-'}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div style={{background:'#EEEBff',borderRadius:12,padding:'12px 14px',marginTop:8,fontSize:12,color:'#534AB7',lineHeight:1.7}}>
        <div style={{fontWeight:700,marginBottom:4}}>📌 เกณฑ์การประเมิน</div>
        ⚡ เร็วมาก: ตอบภายใน 5 นาที<br/>
        ✅ ปกติ: ตอบภายใน 15 นาที<br/>
        ⏳ ช้า: ตอบภายใน 1 ชั่วโมง<br/>
        🔴 ช้ามาก: เกิน 1 ชั่วโมง<br/>
        😊 โทนดี: ประเมินจาก AI วิเคราะห์ข้อความ
      </div>
    </div>
  );
}

// ── จัดการนักบัญชี View ────────────────────────────────────────────────────────
function AccountantView({custs}){
  const COLORS_A=[
    {bg:"#EEEBff",color:"#3C3489"},{bg:"#E6F1FB",color:"#0C447C"},
    {bg:"#E1F5EE",color:"#085041"},{bg:"#FAEEDA",color:"#633806"},
    {bg:"#FCEBEB",color:"#791F1F"},{bg:"#F0EFF8",color:"#534AB7"}
  ];
  const [subTab,setSubTab]=React.useState("assign");
  const [accountants,setAccountants]=React.useState([
    {id:1,name:"น้องบี",tel:"089-111-0001",count:48,colorIdx:0},
    {id:2,name:"น้องแอน",tel:"089-111-0002",count:52,colorIdx:1},
    {id:3,name:"น้องพิม",tel:"089-111-0003",count:45,colorIdx:2},
    {id:4,name:"น้องนิด",tel:"089-111-0004",count:39,colorIdx:3},
  ]);
  const [customers2,setCustomers2]=React.useState(
    (custs||[]).map((c,i)=>({id:c.id,name:c.name,biz:c.biz,type:c.type||'monthly',accountant_id:c.accountant_id||null,colorIdx:i%6}))
  );
  React.useEffect(()=>{
    if(custs&&custs.length){
      setCustomers2(p=>{
        const existingIds=new Set(p.map(x=>x.id));
        const newOnes=(custs||[]).filter(c=>!existingIds.has(c.id)).map((c,i)=>({id:c.id,name:c.name,biz:c.biz,type:c.type||'monthly',accountant_id:c.accountant_id||null,colorIdx:(p.length+i)%6}));
        return newOnes.length?[...p,...newOnes]:p;
      });
    }
  },[custs]);
  const [selAcctId,setSelAcctId]=React.useState(null);
  const [selCustIds,setSelCustIds]=React.useState(new Set());
  const [custFilter,setCustFilter]=React.useState("all");
  const [custSearch,setCustSearch]=React.useState("");
  const [manageSearch,setManageSearch]=React.useState("");
  const [modal,setModal]=React.useState(null); // {type,data}
  const [newAcct,setNewAcct]=React.useState({name:"",tel:""});
  const [newCust,setNewCust]=React.useState({name:"",biz:"",tel:"",type:""});
  const [toast,setToast]=React.useState("");
  const [nextAId,setNextAId]=React.useState(10);
  const [nextCId,setNextCId]=React.useState(20);
  const [previewFile,setPreviewFile]=React.useState(null);

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  const getTypeLabel=(t)=>t==="monthly"?"รายเดือน":t==="company"?"จดบริษัท":t==="annual"?"ยื่นภาษี":t;

  const filteredCusts=customers2.filter(c=>{
    const q=custSearch.toLowerCase();
    const matchQ=!q||c.name.toLowerCase().includes(q)||c.biz.toLowerCase().includes(q);
    const matchF=custFilter==="all"||(custFilter==="unassigned"&&!c.accountant_id)||c.type===custFilter;
    return matchQ&&matchF;
  });

  const toggleCust=(id)=>{
    const s=new Set(selCustIds);
    s.has(id)?s.delete(id):s.add(id);
    setSelCustIds(s);
  };

  const saveAssignment=()=>{
    if(!selAcctId){showToast("กรุณาเลือกนักบัญชีก่อนค่ะ");return;}
    if(selCustIds.size===0){showToast("กรุณาเลือกลูกค้าอย่างน้อย 1 รายค่ะ");return;}
    const updated=customers2.map(c=>selCustIds.has(c.id)?{...c,accountant_id:selAcctId}:c);
    setCustomers2(updated);
    const updatedA=accountants.map(a=>a.id===selAcctId?{...a,count:updated.filter(c=>c.accountant_id===selAcctId).length}:a);
    setAccountants(updatedA);
    setSelCustIds(new Set());
    const acct=accountants.find(a=>a.id===selAcctId);
    showToast(`✅ ผูกลูกค้าให้${acct?.name}แล้วค่ะ`);
  };

  const addAcct=()=>{
    if(!newAcct.name.trim()){showToast("กรุณากรอกชื่อค่ะ");return;}
    setAccountants([...accountants,{id:nextAId,name:newAcct.name,tel:newAcct.tel,count:0,colorIdx:accountants.length%COLORS_A.length}]);
    setNextAId(nextAId+1);
    setNewAcct({name:"",tel:""});
    setModal(null);
    showToast(`✅ เพิ่ม${newAcct.name}แล้วค่ะ`);
  };

  const addCust=()=>{
    if(!newCust.name.trim()){showToast("กรุณากรอกชื่อค่ะ");return;}
    const c={id:nextCId,name:newCust.name,biz:newCust.biz||"-",tel:newCust.tel,type:newCust.type||"monthly",accountant_id:selAcctId,colorIdx:customers2.length%COLORS_A.length};
    setCustomers2([...customers2,c]);
    if(selAcctId){setAccountants(accountants.map(a=>a.id===selAcctId?{...a,count:a.count+1}:a));}
    setNextCId(nextCId+1);
    setNewCust({name:"",biz:"",tel:"",type:""});
    setModal(null);
    showToast(`✅ เพิ่ม${newCust.name}แล้วค่ะ`);
  };

  const confirmDelAcct=(id)=>{
    setCustomers2(customers2.map(c=>c.accountant_id===id?{...c,accountant_id:null}:c));
    const acct=accountants.find(a=>a.id===id);
    setAccountants(accountants.filter(a=>a.id!==id));
    if(selAcctId===id){setSelAcctId(null);setSelCustIds(new Set());}
    setModal(null);
    showToast(`🗑️ ลบ${acct?.name}ออกแล้วค่ะ`);
  };

  const confirmUnlink=(custId)=>{
    const c=customers2.find(x=>x.id===custId);
    setCustomers2(customers2.map(x=>x.id===custId?{...x,accountant_id:null}:x));
    setAccountants(accountants.map(a=>a.id===c?.accountant_id?{...a,count:Math.max(0,a.count-1)}:a));
    setModal(null);
    showToast("👤 เอาออกจากนักบัญชีแล้วค่ะ");
  };

  const confirmDelCust=(custId)=>{
    const c=customers2.find(x=>x.id===custId);
    setCustomers2(customers2.filter(x=>x.id!==custId));
    setAccountants(accountants.map(a=>a.id===c?.accountant_id?{...a,count:Math.max(0,a.count-1)}:a));
    setModal(null);
    showToast(`🗑️ ลบ${c?.name}ออกแล้วค่ะ`);
  };

  const pill=(txt,active,onClick,extraStyle={})=>(
    <button onClick={onClick} style={{border:"1.5px solid",borderColor:active?"transparent":"#E8E6FF",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",background:active?"#534AB7":"#fff",color:active?"#fff":"#8B8BAD",transition:"all .2s",whiteSpace:"nowrap",fontFamily:"inherit",...extraStyle}}>{txt}</button>
  );

  const subTabs=["assign","manage"];
  const subLabels=["👥 แบ่งกลุ่มลูกค้า","⚙️ จัดการลูกค้า"];

  return(
    <div style={{flex:1,overflow:"auto",background:"#F4F3FF"}}>
      {/* Sub tabs */}
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #E8E6FF",padding:"0 20px",gap:4,overflowX:"auto"}}>
        {subTabs.map((t,i)=>(
          <button key={t} onClick={()=>setSubTab(t)} style={{padding:"12px 16px",border:"none",background:"none",fontFamily:"inherit",fontSize:13,fontWeight:500,color:subTab===t?"#534AB7":"#8B8BAD",borderBottom:subTab===t?"3px solid #534AB7":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap",marginBottom:-2}}>{subLabels[i]}</button>
        ))}
      </div>

      <div style={{padding:"16px 20px",maxWidth:900,margin:"0 auto"}}>

        {/* ── TAB: แบ่งกลุ่ม ── */}
        {subTab==="assign"&&(
          <>
            {/* Step 1 */}
            <Card>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:"#8B8BAD",letterSpacing:.5}}>👤 Step 1 — เลือกนักบัญชี</div>
                <button onClick={()=>setModal({type:"addAcct"})} style={{background:"#EEEBff",border:"1.5px solid #AFA9EC",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,color:"#534AB7",cursor:"pointer",fontFamily:"inherit"}}>+ เพิ่มนักบัญชี</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10}}>
                {accountants.map(a=>{
                  const cl=COLORS_A[a.colorIdx%COLORS_A.length];
                  const sel=a.id===selAcctId;
                  return(
                    <div key={a.id} onClick={()=>{setSelAcctId(sel?null:a.id);setSelCustIds(new Set());}} style={{background:sel?"#EEEBff":"#F9F8FF",borderRadius:14,padding:14,border:`1.5px solid ${sel?"#534AB7":"#E8E6FF"}`,cursor:"pointer",position:"relative",transition:"all .2s"}}>
                      <div onClick={e=>{e.stopPropagation();setModal({type:"delAcct",id:a.id});}} style={{position:"absolute",top:10,right:10,width:22,height:22,borderRadius:6,background:"#FCEBEB",border:"1px solid #F09595",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,cursor:"pointer"}}>🗑️</div>
                      <div style={{width:38,height:38,borderRadius:"50%",background:cl.bg,color:cl.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:15,marginBottom:8}}>{a.name.slice(2,4)||a.name.slice(0,2)}</div>
                      <div style={{fontSize:14,fontWeight:700,color:"#1E1B4B",marginBottom:2}}>{a.name}</div>
                      <div style={{fontSize:12,color:"#8B8BAD"}}>ดูแล {a.count} ราย</div>
                    </div>
                  );
                })}
                <div onClick={()=>setModal({type:"addAcct"})} style={{background:"#F9F8FF",borderRadius:14,padding:14,border:"2px dashed #E8E6FF",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,minHeight:108}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:"#EEEBff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#534AB7"}}>+</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#8B8BAD"}}>เพิ่มนักบัญชี</div>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:"#8B8BAD",letterSpacing:.5}}>
                  {selAcctId?`📋 Step 2 — เลือกลูกค้าให้${accountants.find(a=>a.id===selAcctId)?.name}ดูแล`:"📋 Step 2 — เลือกลูกค้า"}
                </div>
                <button onClick={()=>setModal({type:"addCust"})} style={{background:"#EEEBff",border:"1.5px solid #AFA9EC",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,color:"#534AB7",cursor:"pointer",fontFamily:"inherit"}}>+ เพิ่มลูกค้า</button>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:10,background:"#F9F8FF",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
                <span style={{fontSize:16,color:"#C4BFEE"}}>🔍</span>
                <input value={custSearch} onChange={e=>setCustSearch(e.target.value)} placeholder="ค้นหาชื่อลูกค้า หรือกิจการ..." style={{flex:1,border:"none",background:"transparent",fontSize:14,fontFamily:"inherit",outline:"none",color:"#1E1B4B"}}/>
              </div>

              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                {pill(`ทั้งหมด (${customers2.length})`,custFilter==="all",()=>setCustFilter("all"))}
                {pill(`ไม่มีนักบัญชี (${customers2.filter(c=>!c.accountant_id).length})`,custFilter==="unassigned",()=>setCustFilter("unassigned"),{borderColor:custFilter==="unassigned"?"transparent":"#85B7EB",background:custFilter==="unassigned"?"#185FA5":"#fff",color:custFilter==="unassigned"?"#fff":"#0C447C"})}
                {pill("รายเดือน",custFilter==="monthly",()=>setCustFilter("monthly"))}
                {pill("จดบริษัท",custFilter==="company",()=>setCustFilter("company"))}
                {pill("ยื่นภาษี",custFilter==="annual",()=>setCustFilter("annual"),{borderColor:custFilter==="annual"?"transparent":"#5DCAA5",background:custFilter==="annual"?"#0F6E56":"#fff",color:custFilter==="annual"?"#fff":"#085041"})}
              </div>

              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#E6F1FB",borderRadius:10,marginBottom:12}}>
                <div style={{fontSize:13,color:"#0C447C",fontWeight:600}}>เลือกแล้ว {selCustIds.size} ราย</div>
                <button onClick={()=>{const s=new Set(selCustIds);filteredCusts.forEach(c=>s.add(c.id));setSelCustIds(s);}} style={{fontSize:12,color:"#185FA5",fontWeight:700,cursor:"pointer",background:"none",border:"none",fontFamily:"inherit"}}>เลือกทั้งหมดที่แสดง</button>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:360,overflowY:"auto"}}>
                {filteredCusts.map(c=>{
                  const cl=COLORS_A[c.colorIdx%COLORS_A.length];
                  const sel=selCustIds.has(c.id);
                  const acctName=c.accountant_id?(accountants.find(a=>a.id===c.accountant_id)?.name||""):"";
                  return(
                    <div key={c.id} onClick={()=>toggleCust(c.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",background:sel?"#EEEBff":"#F9F8FF",borderRadius:12,cursor:"pointer",border:`1.5px solid ${sel?"#AFA9EC":"transparent"}`,transition:"all .15s"}}>
                      <div style={{width:34,height:34,borderRadius:"50%",background:cl.bg,color:cl.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0}}>{c.name.slice(1,3)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:"#1E1B4B"}}>
                          {c.name}
                          {acctName&&<span style={{background:"#E6F1FB",color:"#0C447C",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700,marginLeft:6}}>{acctName}</span>}
                        </div>
                        <div style={{fontSize:12,color:"#8B8BAD",marginTop:1}}>{c.biz} · {getTypeLabel(c.type)}</div>
                      </div>
                      <div style={{width:22,height:22,borderRadius:6,border:"2px solid",borderColor:sel?"#534AB7":"#E8E6FF",background:sel?"#534AB7":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,color:"#fff"}}>{sel?"✓":""}</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {selCustIds.size>0&&selAcctId&&(
              <div style={{background:"linear-gradient(135deg,#E1F5EE,#E8F4FD)",border:"1.5px solid #5DCAA5",borderRadius:12,padding:"12px 16px",marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:"#085041",marginBottom:6}}>สรุปก่อนบันทึก</div>
                <div style={{fontSize:14,color:"#0F6E56"}}>ผูก <strong>{selCustIds.size} ราย</strong> ให้ <strong>{accountants.find(a=>a.id===selAcctId)?.name}</strong> ดูแล</div>
              </div>
            )}
            <button onClick={saveAssignment} style={{background:"linear-gradient(135deg,#534AB7,#6C5CE7)",color:"#fff",border:"none",borderRadius:12,padding:"13px 24px",fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",boxShadow:"0 3px 10px rgba(83,74,183,.3)"}}>💾 บันทึกการแบ่งกลุ่ม</button>
          </>
        )}

        {/* ฟีดไฟล์ย้ายไปแท็บลูกค้าแล้ว */}

        {/* ── TAB: จัดการลูกค้า ── */}
        {subTab==="manage"&&(
          <Card>
            <div style={{fontSize:13,fontWeight:700,color:"#8B8BAD",letterSpacing:.5,marginBottom:14}}>⚙️ จัดการลูกค้าทั้งหมด</div>
            <div style={{display:"flex",alignItems:"center",gap:10,background:"#F9F8FF",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"10px 14px",marginBottom:10}}>
              <span style={{fontSize:16,color:"#C4BFEE"}}>🔍</span>
              <input value={manageSearch} onChange={e=>setManageSearch(e.target.value)} placeholder="ค้นหาชื่อลูกค้า..." style={{flex:1,border:"none",background:"transparent",fontSize:14,fontFamily:"inherit",outline:"none",color:"#1E1B4B"}}/>
            </div>
            <div style={{display:"flex",gap:14,marginBottom:10,fontSize:12,color:"#8B8BAD",flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:14,height:14,borderRadius:4,background:"#FAEEDA",border:"1px solid #EF9F27"}}></div>เอาออกจากนักบัญชี</div>
              <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:14,height:14,borderRadius:4,background:"#FCEBEB",border:"1px solid #F09595"}}></div>ลบออกจากระบบถาวร</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:500,overflowY:"auto"}}>
              {customers2.filter(c=>!manageSearch||c.name.toLowerCase().includes(manageSearch.toLowerCase())||c.biz.toLowerCase().includes(manageSearch.toLowerCase())).map(c=>{
                const cl=COLORS_A[c.colorIdx%COLORS_A.length];
                const acct=accountants.find(a=>a.id===c.accountant_id);
                return(
                  <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"11px 13px",background:"#F9F8FF",borderRadius:12}}>
                    <div style={{width:34,height:34,borderRadius:"50%",background:cl.bg,color:cl.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0}}>{c.name.slice(1,3)}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600,color:"#1E1B4B"}}>
                        {c.name}
                        {acct&&<span style={{background:"#E6F1FB",color:"#0C447C",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700,marginLeft:6}}>{acct.name}</span>}
                      </div>
                      <div style={{fontSize:12,color:"#8B8BAD",marginTop:1}}>{c.biz} · {getTypeLabel(c.type)}</div>
                    </div>
                    {acct&&<div onClick={()=>setModal({type:"unlink",id:c.id})} style={{width:28,height:28,borderRadius:8,background:"#FAEEDA",border:"1px solid #EF9F27",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",fontSize:14}}>👤</div>}
                    <div onClick={()=>setModal({type:"delCust",id:c.id})} style={{width:28,height:28,borderRadius:8,background:"#FCEBEB",border:"1px solid #F09595",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",fontSize:14}}>🗑️</div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

      </div>

      {/* ── Modals ── */}
      {modal&&(
        <div onClick={e=>{if(e.target===e.currentTarget)setModal(null);}} style={{position:"fixed",inset:0,background:"rgba(30,27,75,.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:"24px 20px",width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto"}}>

            {/* เพิ่มนักบัญชี */}
            {modal.type==="addAcct"&&(
              <>
                <div style={{fontSize:18,fontWeight:800,color:"#1E1B4B",marginBottom:6}}>เพิ่มนักบัญชีใหม่</div>
                <div style={{fontSize:13,color:"#8B8BAD",marginBottom:20}}>กรอกข้อมูลนักบัญชีที่ต้องการเพิ่ม</div>
                <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:700,color:"#534AB7",display:"block",marginBottom:6}}>ชื่อนักบัญชี *</label><input value={newAcct.name} onChange={e=>setNewAcct({...newAcct,name:e.target.value})} placeholder="เช่น น้องนุ่น" style={{width:"100%",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",background:"#F9F8FF",color:"#1E1B4B"}}/></div>
                <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:700,color:"#534AB7",display:"block",marginBottom:6}}>เบอร์โทร</label><input value={newAcct.tel} onChange={e=>setNewAcct({...newAcct,tel:e.target.value})} placeholder="08X-XXX-XXXX" type="tel" style={{width:"100%",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",background:"#F9F8FF",color:"#1E1B4B"}}/></div>
                <div style={{background:"#E1F5EE",border:"1.5px solid #5DCAA5",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#085041"}}>💡 LINE ID จะดึงอัตโนมัติเมื่อนักบัญชีส่งข้อความใน LINE OA บัญชีครั้งแรกค่ะ</div>
                <button onClick={addAcct} style={{background:"linear-gradient(135deg,#534AB7,#6C5CE7)",color:"#fff",border:"none",borderRadius:12,padding:13,fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%"}}>+ เพิ่มนักบัญชี</button>
                <button onClick={()=>setModal(null)} style={{background:"#F4F3FF",color:"#534AB7",border:"1.5px solid #E8E6FF",borderRadius:12,padding:12,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer",width:"100%",marginTop:8}}>ยกเลิก</button>
              </>
            )}

            {/* เพิ่มลูกค้า */}
            {modal.type==="addCust"&&(
              <>
                <div style={{fontSize:18,fontWeight:800,color:"#1E1B4B",marginBottom:6}}>เพิ่มลูกค้าใหม่</div>
                <div style={{fontSize:13,color:"#8B8BAD",marginBottom:20}}>กรอกข้อมูลลูกค้าที่ต้องการเพิ่มเข้าระบบ</div>
                {["ชื่อลูกค้า *:name:คุณ...","ชื่อกิจการ:biz:บริษัท / ร้านค้า...","เบอร์ติดต่อ *:tel:08X-XXX-XXXX"].map(f=>{
                  const [label,key,ph]=f.split(":");
                  return(<div key={key} style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:700,color:"#534AB7",display:"block",marginBottom:6}}>{label}</label><input value={newCust[key]} onChange={e=>setNewCust({...newCust,[key]:e.target.value})} placeholder={ph} style={{width:"100%",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",background:"#F9F8FF",color:"#1E1B4B"}}/></div>);
                })}
                <div style={{marginBottom:14}}><label style={{fontSize:13,fontWeight:700,color:"#534AB7",display:"block",marginBottom:6}}>ประเภทบริการ</label><select value={newCust.type} onChange={e=>setNewCust({...newCust,type:e.target.value})} style={{width:"100%",border:"1.5px solid #E8E6FF",borderRadius:12,padding:"12px 14px",fontSize:14,fontFamily:"inherit",outline:"none",background:"#F9F8FF",color:"#1E1B4B"}}><option value="">-- เลือกบริการ --</option><option value="monthly">บัญชีรายเดือน</option><option value="company">จดบริษัท</option><option value="annual">ยื่นภาษี</option></select></div>
                {selAcctId&&<div style={{background:"#E1F5EE",border:"1.5px solid #5DCAA5",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#085041"}}>💡 จะผูกกับ{accountants.find(a=>a.id===selAcctId)?.name}โดยอัตโนมัติ</div>}
                <button onClick={addCust} style={{background:"linear-gradient(135deg,#534AB7,#6C5CE7)",color:"#fff",border:"none",borderRadius:12,padding:13,fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%"}}>+ เพิ่มลูกค้า</button>
                <button onClick={()=>setModal(null)} style={{background:"#F4F3FF",color:"#534AB7",border:"1.5px solid #E8E6FF",borderRadius:12,padding:12,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer",width:"100%",marginTop:8}}>ยกเลิก</button>
              </>
            )}

            {/* ลบนักบัญชี */}
            {modal.type==="delAcct"&&(()=>{
              const acct=accountants.find(a=>a.id===modal.id);
              const cnt=customers2.filter(c=>c.accountant_id===modal.id).length;
              return(<>
                <div style={{fontSize:18,fontWeight:800,color:"#1E1B4B",marginBottom:16}}>ลบนักบัญชีออกจากระบบ?</div>
                <div style={{background:"#FCEBEB",border:"1.5px solid #F09595",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#791F1F",lineHeight:1.7,display:"flex",alignItems:"flex-start",gap:10}}><span style={{fontSize:18,flexShrink:0}}>⚠️</span><div>ลบ <strong>{acct?.name}</strong> ออกถาวร ลูกค้า <strong>{cnt} ราย</strong> ที่ดูแลอยู่จะไม่มีนักบัญชีดูแล ต้องแบ่งใหม่ทีหลังค่ะ</div></div>
                <div style={{display:"flex",gap:10}}><button onClick={()=>confirmDelAcct(modal.id)} style={{flex:1,background:"linear-gradient(135deg,#D63031,#E74C3C)",color:"#fff",border:"none",borderRadius:12,padding:13,fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer"}}>🗑️ ยืนยันลบ</button><button onClick={()=>setModal(null)} style={{flex:1,background:"#F4F3FF",color:"#534AB7",border:"1.5px solid #E8E6FF",borderRadius:12,padding:12,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer"}}>ยกเลิก</button></div>
              </>);
            })()}

            {/* เอาลูกค้าออกจากนักบัญชี */}
            {modal.type==="unlink"&&(()=>{
              const c=customers2.find(x=>x.id===modal.id);
              const acct=accountants.find(a=>a.id===c?.accountant_id);
              return(<>
                <div style={{fontSize:18,fontWeight:800,color:"#1E1B4B",marginBottom:16}}>เอาลูกค้าออกจากนักบัญชี?</div>
                <div style={{background:"#FFF8E1",border:"1.5px solid #EF9F27",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#633806",lineHeight:1.7,display:"flex",alignItems:"flex-start",gap:10}}><span style={{fontSize:18,flexShrink:0}}>ℹ️</span><div><strong>{c?.name}</strong> จะไม่อยู่ในความดูแลของ<strong>{acct?.name}</strong>อีกต่อไป แต่ยังคงอยู่ในระบบ CRM ค่ะ</div></div>
                <button onClick={()=>confirmUnlink(modal.id)} style={{width:"100%",background:"linear-gradient(135deg,#EF9F27,#FDCB6E)",color:"#412402",border:"none",borderRadius:12,padding:13,fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer"}}>👤 ยืนยันเอาออก</button>
                <button onClick={()=>setModal(null)} style={{background:"#F4F3FF",color:"#534AB7",border:"1.5px solid #E8E6FF",borderRadius:12,padding:12,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer",width:"100%",marginTop:8}}>ยกเลิก</button>
              </>);
            })()}

            {/* ลบลูกค้าถาวร */}
            {modal.type==="delCust"&&(()=>{
              const c=customers2.find(x=>x.id===modal.id);
              return(<>
                <div style={{fontSize:18,fontWeight:800,color:"#1E1B4B",marginBottom:16}}>ลบลูกค้าออกจากระบบถาวร?</div>
                <div style={{background:"#FCEBEB",border:"1.5px solid #F09595",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#791F1F",lineHeight:1.7,display:"flex",alignItems:"flex-start",gap:10}}><span style={{fontSize:18,flexShrink:0}}>⚠️</span><div>ลบ <strong>{c?.name}</strong> ออกถาวร ข้อมูล CRM ใบรับงาน และประวัติทั้งหมดจะหายไปค่ะ ไม่สามารถกู้คืนได้</div></div>
                <button onClick={()=>confirmDelCust(modal.id)} style={{width:"100%",background:"linear-gradient(135deg,#D63031,#E74C3C)",color:"#fff",border:"none",borderRadius:12,padding:13,fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer"}}>🗑️ ยืนยันลบถาวร</button>
                <button onClick={()=>setModal(null)} style={{background:"#F4F3FF",color:"#534AB7",border:"1.5px solid #E8E6FF",borderRadius:12,padding:12,fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer",width:"100%",marginTop:8}}>ยกเลิก</button>
              </>);
            })()}

          </div>
        </div>
      )}

      {/* Toast */}
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1E1B4B",color:"#fff",padding:"12px 24px",borderRadius:12,fontSize:14,fontWeight:600,zIndex:999,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState("db");
  const [custs,setCusts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [refreshing,setRefreshing]=useState(false);
  const [lastUpdated,setLastUpdated]=useState(null);
  const [isWide,setIsWide]=useState(typeof window!=='undefined'&&window.innerWidth>=768);

  React.useEffect(()=>{
    const handler=()=>setIsWide(window.innerWidth>=768);
    window.addEventListener('resize',handler);
    return ()=>window.removeEventListener('resize',handler);
  },[]);

  function fetchData(showRefresh=false){
    if(showRefresh) setRefreshing(true);
    fetch(`${API_URL}/api/customers`)
      .then(r=>r.json())
      .then(data=>{ if(Array.isArray(data)) setCusts(data.map(mapCust)); setLoading(false); setRefreshing(false); setLastUpdated(new Date().toLocaleTimeString('th-TH')); })
      .catch(()=>{ setLoading(false); setRefreshing(false); });
  }

  React.useEffect(()=>{ fetchData(); const iv=setInterval(()=>fetchData(),30000); return ()=>clearInterval(iv); },[]);

  const addCust=c=>setCusts(p=>[...p,c]);
  const m=custs.filter(c=>c.type==="monthly").length;
  const co=custs.filter(c=>c.type==="company").length;
  const a=custs.filter(c=>c.type==="annual").length;
  const totalRev=custs.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);

  const MAIN_NAV=[
    {id:"db",    label:"Dashboard",   icon:"▦"},
    {id:"crm",   label:"ลูกค้า",      icon:"👥"},
    {id:"pipe",  label:"Pipeline",    icon:"🎯"},
    {id:"tgt",   label:"เป้าเซลล์",   icon:"📈"},
    {id:"churn", label:"Churn",       icon:"❌"},
    {id:"forms", label:"ใบรับงาน",    icon:"📄"},
    {id:"acct",  label:"นักบัญชี",    icon:"🧑\u200d💼"},
    {id:"perf",  label:"ประเมินทีม",   icon:"📊"},
    {id:"target", label:"เป้าเซลล์",    icon:"🎯"},
  ];

  const tabLabel=MAIN_NAV.find(n=>n.id===tab)?.label||"";

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Sarabun,sans-serif",height:"100vh",display:"flex",overflow:"hidden",background:C.bg}}>

      {/* Sidebar — desktop */}
      {isWide && (
        <div style={{width:220,background:"#1E1B4B",display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"22px 18px 16px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:38,height:38,background:"#6C5CE7",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:"#fff"}}>F</div>
              <div>
                <div style={{color:"#fff",fontWeight:800,fontSize:15}}>Finovas</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:10}}>ระบบบัญชีอัจฉริยะ</div>
              </div>
            </div>
          </div>
          <div style={{padding:"12px 14px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{background:"rgba(108,92,231,.25)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:9,marginBottom:3}}>ลูกค้า</div>
                <div style={{color:"#fff",fontWeight:800,fontSize:20}}>{custs.length}</div>
              </div>
              <div style={{background:"rgba(0,184,148,.2)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:9,marginBottom:3}}>รายได้</div>
                <div style={{color:"#00B894",fontWeight:800,fontSize:12}}>฿{totalRev.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div style={{flex:1,padding:"14px 10px",overflowY:"auto"}}>
            <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.25)",letterSpacing:1.5,marginBottom:10,paddingLeft:10}}>เมนูหลัก</div>
            {MAIN_NAV.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)}
                style={{width:"100%",background:tab===n.id?"#6C5CE7":"transparent",color:tab===n.id?"#fff":"rgba(255,255,255,.5)",border:"none",borderRadius:10,padding:"10px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:tab===n.id?700:400,fontSize:13,display:"flex",alignItems:"center",gap:12,marginBottom:3,transition:"all .15s"}}>
                <span style={{fontSize:16}}>{n.icon}</span><span>{n.label}</span>
              </button>
            ))}
          </div>
          <div style={{padding:"14px 16px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:10,background:"#6C5CE7",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:13}}>ผ</div>
            <div style={{flex:1}}>
              <div style={{color:"#fff",fontSize:11,fontWeight:700}}>แอดมิน</div>
              <div style={{color:"rgba(255,255,255,.35)",fontSize:9}}>Finovas CRM</div>
            </div>
            <button onClick={()=>fetchData(true)} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:16}}>{refreshing?"⏳":"🔄"}</button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

        {/* Banner — Finovas Global */}
        <div style={{background:"linear-gradient(135deg,#1E1B4B 0%,#4B3BB5 60%,#6C5CE7 100%)",padding:"18px 24px",flexShrink:0,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
          <div style={{position:"absolute",bottom:-30,right:80,width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
            <div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.5)",letterSpacing:2,marginBottom:4}}>FINOVAS GLOBAL</div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:-.5}}>ระบบบัญชีอัจฉริยะ</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:3}}>{custs.length} ลูกค้า · รายได้ ฿{totalRev.toLocaleString()}/เดือน</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>อัพเดท</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lastUpdated||"--:--"}</div>
              <button onClick={()=>fetchData(true)} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,padding:"5px 12px",cursor:"pointer",color:"#fff",fontSize:11,fontFamily:"inherit",marginTop:6,display:"block",width:"100%"}}>{refreshing?"⏳ โหลด...":"🔄 รีเฟรช"}</button>
            </div>
          </div>
        </div>

        {/* Top bar */}
        <div style={{background:C.white,borderBottom:`1px solid ${C.bdr}`,padding:"12px 20px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          {!isWide && <div style={{width:32,height:32,background:"#6C5CE7",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:"#fff",flexShrink:0}}>F</div>}
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:15,color:C.text}}>{tabLabel}</div>
            <div style={{fontSize:11,color:C.muted}}>{m} รายเดือน · {co} จดบริษัท · {a} ยื่นภาษี</div>
          </div>

        </div>

        {/* Content */}
        <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>
          {loading && <div style={{padding:40,textAlign:"center",color:C.muted,fontSize:14,background:C.bg,flex:1}}>⏳ กำลังโหลดข้อมูล...</div>}
          {!loading && tab==="db"    && <DashboardView custs={custs}/>}
          {!loading && tab==="crm"   && <CRMView custs={custs} setCusts={setCusts}/>}
          {!loading && tab==="pipe"  && <PipelineView custs={custs}/>}
          {tab==="tgt"   && <TargetsView/>}
          {tab==="churn" && <ChurnView/>}
          {tab==="forms" && <SecFormsView/>}
          {tab==="acct"  && <AccountantView custs={custs}/>}
          {tab==="perf"  && <AccountantPerfView/>}
          {tab==="target"&& <SalesTargetView/>}
        </div>

        {/* Bottom nav — mobile */}
        {!isWide && (
          <div style={{display:"flex",borderTop:`1px solid ${C.bdr}`,background:"#1E1B4B",flexShrink:0,padding:"6px 8px",gap:2}}>
            {MAIN_NAV.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,minWidth:44,background:tab===n.id?"#6C5CE7":"transparent",border:"none",borderRadius:10,padding:"7px 2px",cursor:"pointer",fontSize:10,fontWeight:tab===n.id?700:400,color:tab===n.id?"#fff":"rgba(255,255,255,.45)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"inherit",transition:"all .15s"}}>
                <span style={{fontSize:15}}>{n.icon}</span>
                <span style={{fontSize:9}}>{n.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
