import { useState } from "react";

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
  white:"var(--color-background-primary)",
  line:"#06C755", linedk:"#075E54",
};

// ── Static Data ───────────────────────────────────────────────────────────────
const CUSTS_INIT = [
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
  return <span style={{background:bg,color:c,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:500,whiteSpace:"nowrap",display:"inline-block",...style}}>{children}</span>;
}
function Card({children,style={}}){
  return <div style={{background:C.white,borderRadius:12,border:`0.5px solid ${C.bdr}`,padding:14,marginBottom:10,...style}}>{children}</div>;
}
function CTitle({children}){ return <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-primary)",marginBottom:10}}>{children}</div>; }
function BarRow({label,val,total,color,lw=80}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
      <span style={{fontSize:10,color,minWidth:lw,fontWeight:500}}>{label}</span>
      <div style={{flex:1,height:5,background:"var(--color-background-secondary)",borderRadius:3,overflow:"hidden"}}>
        <div style={{width:`${pct(val,total)}%`,height:"100%",background:color,borderRadius:3,transition:"width .3s"}}/>
      </div>
      <b style={{fontSize:11,color:"var(--color-text-primary)",minWidth:20,textAlign:"right"}}>{val}</b>
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
function CRMView({custs,setCusts}){
  const [search,setSearch]=useState("");
  const [fType,setFType]=useState("");
  const [fStatus,setFStatus]=useState("");
  const [sel,setSel]=useState(null);
  const filtered=custs.filter(c=>{
    const q=search.toLowerCase();
    return (!q||c.name.toLowerCase().includes(q)||c.biz.toLowerCase().includes(q))&&(!fType||c.type===fType)&&(!fStatus||c.status===fStatus);
  });
  const selected=sel?custs.find(c=>c.id===sel.id):null;
  function upd(id,patch){setCusts(p=>p.map(c=>c.id===id?{...c,...patch}:c));if(sel?.id===id)setSel(s=>({...s,...patch}));}

  return(
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      <div style={{width:selected?"46%":"100%",display:"flex",flexDirection:"column",borderRight:selected?`0.5px solid ${C.bdr}`:"none"}}>
        <div style={{padding:"9px 12px",borderBottom:`0.5px solid ${C.bdr}`,display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ค้นหา..."
            style={{flex:1,border:`0.5px solid ${C.bdr}`,borderRadius:8,padding:"6px 10px",fontSize:12,fontFamily:"inherit",outline:"none",background:C.white,minWidth:80}}/>
          <select value={fType} onChange={e=>setFType(e.target.value)} style={{border:`0.5px solid ${C.bdr}`,borderRadius:8,padding:"6px 8px",fontSize:11,fontFamily:"inherit",background:C.white}}>
            <option value="">ทุกประเภท</option>
            {Object.entries(TM).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
          </select>
          <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{border:`0.5px solid ${C.bdr}`,borderRadius:8,padding:"6px 8px",fontSize:11,fontFamily:"inherit",background:C.white}}>
            <option value="">ทุกสถานะ</option>
            {Object.entries(SM).map(([k,v])=><option key={k} value={k}>{k}·{v.l}</option>)}
          </select>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {filtered.length===0 && <div style={{padding:32,textAlign:"center",color:C.muted}}>ไม่พบลูกค้า</div>}
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>setSel(selected?.id===c.id?null:c)} style={{padding:"10px 12px",borderBottom:`0.5px solid ${C.bdr}`,cursor:"pointer",background:selected?.id===c.id?"var(--color-background-info)":C.white}}>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5,flexWrap:"wrap"}}>
                <span style={{fontWeight:500,fontSize:12,color:"var(--color-text-primary)"}}>{c.name}</span>
                <Pill c={TM[c.type].c} bg={TM[c.type].bg}>{TM[c.type].l}</Pill>
                <Pill c={SM[c.status].c} bg={SM[c.status].bg}>{c.status}</Pill>
                {c.docRisk && <span style={{marginLeft:"auto",fontSize:10,color:C.red,fontWeight:500}}>📄 ค้าง</span>}
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{c.biz}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                <Pill c={C.teal} bg={C.tealBg}>{c.svc}</Pill>
                {c.paid?<Pill c={C.green} bg={C.greenBg}>ชำระแล้ว</Pill>:<Pill c={C.amber} bg={C.amberBg}>ยังไม่ชำระ</Pill>}
                {c.by!=="-" && <Pill c={C.blue} bg={C.blueBg}>เซลล์: {c.by}</Pill>}
                {c.price>0 && <span style={{fontSize:11,color:C.green,fontWeight:500,marginLeft:"auto"}}>฿{c.price.toLocaleString()}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div style={{flex:1,overflowY:"auto",padding:14,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:500,fontSize:15,color:"var(--color-text-primary)"}}>{selected.name}</div>
              <div style={{fontSize:11,color:C.muted}}>{selected.biz}</div>
            </div>
            <Pill c={TM[selected.type].c} bg={TM[selected.type].bg}>{TM[selected.type].l}</Pill>
            <Pill c={SM[selected.status].c} bg={SM[selected.status].bg}>{selected.status}</Pill>
            <button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.muted}}>✕</button>
          </div>
          <Card>
            <CTitle>บริการและราคา</CTitle>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["บริการ",selected.svc],["ประเภทธุรกิจ",selected.bizType],["ช่องทาง",selected.src],["เซลล์",selected.by],["ราคา",selected.price>0?`฿${selected.price.toLocaleString()}/เดือน`:"ยังไม่กำหนด"]].map(([l,v])=>(
                <div key={l}><div style={{fontSize:10,color:C.muted}}>{l}</div><div style={{fontSize:12,color:"var(--color-text-primary)",fontWeight:500}}>{v}</div></div>
              ))}
            </div>
          </Card>
          <Card>
            <CTitle>สถานะงาน</CTitle>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
              {Object.entries(SM).map(([k,v])=>(
                <button key={k} onClick={()=>upd(selected.id,{status:k})} style={{background:selected.status===k?v.bg:"transparent",color:selected.status===k?v.c:C.muted,border:`0.5px solid ${selected.status===k?v.c:C.bdr}`,borderRadius:16,padding:"3px 9px",cursor:"pointer",fontSize:11,fontWeight:500,fontFamily:"inherit"}}>{k}·{v.l}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>upd(selected.id,{paid:!selected.paid})} style={{flex:1,background:selected.paid?C.greenBg:C.surf,color:selected.paid?C.green:C.muted,border:`0.5px solid ${selected.paid?C.green:C.bdr}`,borderRadius:8,padding:7,cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>{selected.paid?"✅ ชำระแล้ว":"⏳ ยังไม่ชำระ"}</button>
              <button onClick={()=>upd(selected.id,{docRisk:!selected.docRisk})} style={{flex:1,background:!selected.docRisk?C.greenBg:C.redBg,color:!selected.docRisk?C.green:C.red,border:`0.5px solid ${!selected.docRisk?C.green:C.red}`,borderRadius:8,padding:7,cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>{!selected.docRisk?"📂 เอกสารครบ":"📄 เอกสารขาด"}</button>
            </div>
          </Card>
          {selected.concern && <Card style={{background:C.amberBg,border:`0.5px solid ${C.amber}40`}}><CTitle>ข้อกังวล</CTitle><div style={{fontSize:12,color:"var(--color-text-primary)"}}>{selected.concern}</div></Card>}
        </div>
      )}
    </div>
  );
}

// ── Dashboard View ────────────────────────────────────────────────────────────
// ── Dashboard View ────────────────────────────────────────────────────────────
function DashboardView({custs}){
  const monthly=custs.filter(c=>c.type==="monthly"),company=custs.filter(c=>c.type==="company"),annual=custs.filter(c=>c.type==="annual");
  const rev=custs.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
  const docRisk=custs.filter(c=>c.docRisk),unpaid=custs.filter(c=>c.status==="B"&&!c.paid);
  const sources={};custs.forEach(c=>{sources[c.src]=(sources[c.src]||0)+1;});
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
        {[{v:custs.length,l:"ลูกค้าทั้งหมด",c:C.teal},{v:`฿${rev.toLocaleString()}`,l:"รายได้/เดือน",c:C.green},{v:docRisk.length,l:"เอกสารค้าง",c:C.red},{v:unpaid.length,l:"ยังไม่ชำระ",c:C.amber}].map(k=>(
          <div key={k.l} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"11px 12px"}}>
            <div style={{fontSize:k.v.toString().length>5?14:18,fontWeight:500,color:k.c,marginBottom:2}}>{k.v}</div>
            <div style={{fontSize:10,color:C.muted}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
        {[{data:monthly,k:"monthly"},{data:company,k:"company"},{data:annual,k:"annual"}].map(({data,k})=>{
          const t=TM[k],r=data.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
          return(
            <Card key={k} style={{borderTop:`2px solid ${t.c}`,padding:11}}>
              <div style={{fontSize:10,fontWeight:500,color:t.c,marginBottom:4}}>{t.l}</div>
              <div style={{fontSize:20,fontWeight:500,color:"var(--color-text-primary)",marginBottom:2}}>{data.length} <span style={{fontSize:10,color:C.muted}}>ราย</span></div>
              <div style={{fontSize:10,color:C.green,fontWeight:500,marginBottom:8}}>฿{r.toLocaleString()}</div>
              {Object.entries(SM).map(([s,v])=>{const n=data.filter(c=>c.status===s).length;if(!n)return null;return <BarRow key={s} label={`${s}·${v.l}`} val={n} total={data.length} color={v.c} lw={64}/>;})}</Card>
          );
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <Card><CTitle>สถานะลูกค้า</CTitle>{Object.entries(SM).map(([s,v])=><BarRow key={s} label={`${s}·${v.l}`} val={custs.filter(c=>c.status===s).length} total={custs.length} color={v.c} lw={80}/>)}</Card>
        <Card><CTitle>ช่องทางที่มา</CTitle>{Object.entries(sources).sort((a,b)=>b[1]-a[1]).map(([s,n])=><BarRow key={s} label={s} val={n} total={custs.length} color={C.teal} lw={72}/>)}</Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <Card><CTitle>ประสิทธิภาพทีมบัญชี</CTitle>
          {[{l:"ตอบกลับเฉลี่ย",v:"12 นาที",c:C.green},{l:"เอกสารตรวจแล้ว",v:"47 ไฟล์",c:C.teal},{l:"ความพึงพอใจ",v:"4.7/5",c:C.purple},{l:"ปัญหาที่พบบ่อย",v:"เอกสารไม่ครบ",c:C.amber}].map(i=>(
            <div key={i.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`0.5px solid ${C.bdr}`,fontSize:11}}><span style={{color:C.muted}}>{i.l}</span><span style={{fontWeight:500,color:i.c}}>{i.v}</span></div>
          ))}
        </Card>
        <Card><CTitle>ผลงานเซลล์</CTitle>
          {SALESPEOPLE.map(sp=>{
            const mine=custs.filter(c=>c.by===sp.name&&c.status==="B"),rev2=mine.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
            return(
              <div key={sp.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:sp.c+"20",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,color:sp.c,fontSize:13,flexShrink:0}}>{sp.name[0]}</div>
                <div style={{flex:1}}><div style={{fontWeight:500,fontSize:12,color:"var(--color-text-primary)"}}>{sp.name}</div><div style={{fontSize:10,color:C.muted}}>{mine.length} ราย</div></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:500,color:C.green,fontSize:12}}>฿{rev2.toLocaleString()}</div><div style={{fontSize:9,color:C.muted}}>รายได้/เดือน</div></div>
              </div>
            );
          })}
        </Card>
      </div>
      {docRisk.length>0 && (
        <Card style={{background:C.redBg,border:`0.5px solid ${C.red}40`}}>
          <CTitle>เอกสารค้างส่ง — ต้องติดตาม</CTitle>
          {docRisk.map(c=>(
            <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`0.5px solid rgba(163,45,45,.15)`}}>
              <Pill c={TM[c.type].c} bg={TM[c.type].bg}>{TM[c.type].l}</Pill>
              <b style={{fontSize:12,color:"var(--color-text-primary)",flex:1}}>{c.name}</b>
              <span style={{fontSize:10,color:C.muted}}>{c.by}</span>
              <Pill c={C.red} bg={C.redBg}>ค้าง</Pill>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ── Pipeline ──────────────────────────────────────────────────────────────────
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
                  <div style={{fontWeight:500,color:"var(--color-text-primary)"}}>{c.name}</div>
                  <div style={{color:C.muted,fontSize:10}}>{c.svc}</div>
                  {c.price>0 && <div style={{color:C.green,fontSize:10,fontWeight:500}}>฿{c.price.toLocaleString()}</div>}
                  <div style={{color:"var(--color-text-tertiary)",fontSize:9}}>{c.by}</div>
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
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:8}}>เป้าหมายเซลล์ — วัดเป็นจำนวนลูกค้า</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {SALESPEOPLE.map(sp=>{
          const totT=sp.targets.reduce((s,t)=>s+t.t,0),totD=sp.targets.reduce((s,t)=>s+t.d,0);
          return(
            <Card key={sp.name}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:sp.c+"20",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,color:sp.c,fontSize:13}}>{sp.name[0]}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:13,color:"var(--color-text-primary)"}}>{sp.name}</div>
                  <div style={{fontSize:10,color:sp.c}}>ภาพรวม {pct(totD,totT)}%</div>
                </div>
              </div>
              {sp.targets.map(t=>{
                const p=pct(t.d,t.t),c=p>=80?C.green:p>=50?C.amber:C.red;
                return(
                  <div key={t.l} style={{marginBottom:9}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}><span style={{color:"var(--color-text-primary)"}}>{t.l}</span><span style={{color:c,fontWeight:500}}>{t.d}/{t.t} ราย ({p}%)</span></div>
                    <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:3,overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:c,borderRadius:3,transition:"width .3s"}}/></div>
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
  const reasons={};CHURN_DATA.forEach(c=>{reasons[c.reason]=(reasons[c.reason]||0)+1;});
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:C.muted,marginBottom:8}}>วิเคราะห์สาเหตุลูกค้าออก</div>
      <Card>
        <CTitle>สาเหตุหลัก</CTitle>
        {Object.entries(reasons).sort((a,b)=>b[1]-a[1]).map(([r,n])=><BarRow key={r} label={r} val={n} total={CHURN_DATA.length} color={C.red} lw={80}/>)}
      </Card>
      <Card>
        <CTitle>รายละเอียด</CTitle>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,tableLayout:"fixed"}}>
          <thead>
            <tr style={{borderBottom:`0.5px solid ${C.bdr}`}}>
              {["ชื่อ","บริการ","สาเหตุ","เดือน"].map(h=><th key={h} style={{padding:"5px 7px",textAlign:"left",fontSize:10,fontWeight:500,color:C.muted}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {CHURN_DATA.map((c,i)=>(
              <tr key={i} style={{borderBottom:`0.5px solid ${C.bdr}`}}>
                <td style={{padding:"6px 7px",fontWeight:500,color:"var(--color-text-primary)"}}>{c.name}</td>
                <td style={{padding:"6px 7px",color:C.muted,fontSize:10}}>{c.svc}</td>
                <td style={{padding:"6px 7px"}}><Pill c={C.red} bg={C.redBg}>{c.reason}</Pill></td>
                <td style={{padding:"6px 7px",color:C.muted}}>{c.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── CRM View ──────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("line");
  const [lineTab,setLineTab]=useState("sales");
  const [custs,setCusts]=useState(CUSTS_INIT);
  const addCust=c=>setCusts(p=>[...p,c]);
  const m=custs.filter(c=>c.type==="monthly").length;
  const co=custs.filter(c=>c.type==="company").length;
  const a=custs.filter(c=>c.type==="annual").length;

  const MAIN_NAV=[
    {id:"line",label:"LINE Hub",icon:"💬"},
    {id:"crm",label:"CRM",icon:"👥"},
    {id:"db",label:"Dashboard",icon:"📊"},
    {id:"pipe",label:"Pipeline",icon:"🎯"},
    {id:"tgt",label:"เป้าเซลล์",icon:"📈"},
    {id:"churn",label:"Churn",icon:"❌"},
  ];
  const LINE_TABS=[
    {id:"sales",label:"เซลล์",icon:"💬",color:C.line},
    {id:"sec",label:"เลขา",icon:"📎",color:C.purple},
    {id:"acct",label:"บัญชี",icon:"🧾",color:C.blue},
  ];

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Sarabun,sans-serif",background:"var(--color-background-secondary)",display:"flex",flexDirection:"column",height:"100vh",maxHeight:820,maxWidth:760,margin:"0 auto"}}>
      <div style={{background:C.navy,color:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{width:30,height:30,background:C.teal,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:C.navy,flexShrink:0}}>F</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:500,fontSize:13}}>Finovas CRM — Demo เต็มระบบ</div>
          <div style={{fontSize:10,color:C.tealBg}}>รายเดือน {m} · จดบริษัท {co} · ยื่นภาษี {a} · รวม {custs.length} ราย</div>
        </div>
      </div>

      <div style={{display:"flex",background:C.white,borderBottom:`0.5px solid ${C.bdr}`,flexShrink:0,overflowX:"auto"}}>
        {MAIN_NAV.map(n=>(
          <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,minWidth:54,background:"transparent",border:"none",borderBottom:tab===n.id?`2px solid ${C.teal}`:"2px solid transparent",padding:"9px 4px",cursor:"pointer",fontSize:10,fontWeight:500,color:tab===n.id?C.teal:"var(--color-text-secondary)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"inherit",transition:"color .15s"}}>
            <span style={{fontSize:14}}>{n.icon}</span><span>{n.label}</span>
          </button>
        ))}
      </div>

      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>
        {tab==="line" && (
          <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
            <div style={{display:"flex",borderBottom:`0.5px solid ${C.bdr}`,background:C.white,flexShrink:0}}>
              {LINE_TABS.map(lt=>(
                <button key={lt.id} onClick={()=>setLineTab(lt.id)} style={{flex:1,background:lineTab===lt.id?lt.color+"14":"transparent",color:lineTab===lt.id?lt.color:"var(--color-text-secondary)",border:"none",borderBottom:lineTab===lt.id?`2px solid ${lt.color}`:"2px solid transparent",padding:"9px 6px",cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:11,whiteSpace:"nowrap"}}>
                  {lt.icon} {lt.label}
                </button>
              ))}
            </div>
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>
              {lineTab==="sales" && <LineSalesView onAddCust={addCust}/>}
              {lineTab==="sec"   && <LineSecView/>}
              {lineTab==="acct"  && <LineAcctView/>}
            </div>
          </div>
        )}
        {tab==="crm"   && <CRMView custs={custs} setCusts={setCusts}/>}
        {tab==="db"    && <DashboardView custs={custs}/>}
        {tab==="pipe"  && <PipelineView custs={custs}/>}
        {tab==="tgt"   && <TargetsView/>}
        {tab==="churn" && <ChurnView/>}
      </div>
    </div>
  );
}
