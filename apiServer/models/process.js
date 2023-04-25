var mongoose = require ('mongoose')

const postSchema = new mongoose.Schema({
        Title: String,
        Type: String,
        Description: String
});
var processSchema= new mongoose.Schema({
        _id:String,
        DescriptionLevel:String,
        EntityType: String,
        CompleteUnitId: String,
        UnitId: String,
        RepositoryCode: String,
        CountryCode: String,
        UnitTitleType: String,
        UnitTitle: String,
        AlternativeTitle:String,
        NormalizedFormsName:String,
        OtherFormsName:String,
        UnitDateInitial:String,
        UnitDateFinal: String,
        UnitDateInitialCertainty: String,
        UnitDateFinalCertainty:String,
        AllowUnitDatesInference:String,
        AccumulationDates: String,
        UnitDateBulk: String,
        UnitDateNotes: String,
        Dimensions: String,
        AllowExtentsInference: String,
        Repository: String,
        Producer: String,
        Author: String,
        MaterialAuthor: String,
        Contributor: String,
        Recipient: String,
        BiogHis: String,
        GeogName: String,
        LegalStatus: String,
        Functions: String,
        Authorities: String,
        InternalStructure: String,
        GeneralContext: String,
        CustodHist: String,
        AcqInfo: String,
        Classifier: String,
        ScopeContent: String,
        Terms: String,
        DocumentalTradition: String,
        DocumentalTypology: String,
        Marks: String,
        Monograms: String,
        Stamps: String,
        Inscriptions: String,
        Signatures: String,
        Appraisal: String,
        AppraisalElimination: String,
        AppraisalEliminationDate: String,
        Accruals: String,
        Arrangement: String,
        AccessRestrict: String,
        UseRestrict: String,
        PhysLoc: String,
        OriginalNumbering: String,
        PreviousLoc: String,
        LangMaterial: String,
        PhysTech: String,
        OtherFindAid: String,
        ContainerTypeTerm: String,
        OriginalsLoc: String,
        AltFormAvail: String,
        RelatedMaterial: String,
        Note: String,
        AllowTextualContentInference: String,
        TextualContent: String,
        RetentionDisposalDocumentState: String,
        ApplySelectionTable: String,
        RetentionDisposalPolicy: String,
        RetentionDisposalReference: String,
        RetentionDisposalClassification: String,
        RetentionDisposalPeriod: String,
        RetentionDisposalApplyDate: String,
        RetentionDisposalFinalDestination: String,
        RetentionDisposalObservations: String,
        DescRules: String,
        Revised: String,
        Published: String,
        Available: String,
        Highlighted: String,
        Creator: String,
        Created: String,
        Username: String,
        ProcessInfoDate: String,
        OtherDescriptiveData: String,
        ProcessInfo: String,
        ligacoes:[String],
        posts:[{
                type: postSchema,
                required: false 
        }]
})

module.exports = mongoose.model('process',processSchema)