function objEth(strNum,strAddr,strEnNum,pckNum,pckSpeed,pckFreq,
				burNum,burBeginNum,burEndNum,setErr,
				preamble,sfd,dmac,smac,
				vlanWordSize,vlanWordMem,
				ethType,ploadSetType,ploadSetLength,
				ploadSetFixValue,ploadSetIncValue,
				randomLengthLow,randomLengthHigh,
				subHeadSize,subHeadMem,
				commentMem
				)
{
	this.strNum=strNum;
	this.strAddr=strAddr;
	this.strEnNum=strEnNum;
	this.pckNum=pckNum;
	this.pckSpeed=pckSpeed;
	this.pckFreq=pckFreq;
	this.burNum=burNum;
	this.burBeginNum=burBeginNum;
	this.burEndNum=burEndNum;
	this.setErr=setErr;
	this.preamble=preamble;
	this.sfd=sfd;
	this.dmac=dmac;
	this.smac=smac;
	this.vlanWordSize=vlanWordSize;
	this.vlanWordMem=vlanWordMem;
	this.ethType=ethType;
	this.ploadSetType=ploadSetType;
	this.ploadSetLength=ploadSetLength;
	this.ploadSetFixValue=ploadSetFixValue;
	this.ploadSetIncValue=ploadSetIncValue;
	this.randomLengthLow=randomLengthLow;
	this.randomLengthHigh=randomLengthHigh;
	this.subHeadSize=subHeadSize;
	this.subHeadMem=subHeadMem;
	this.commentMem=commentMem;
}
