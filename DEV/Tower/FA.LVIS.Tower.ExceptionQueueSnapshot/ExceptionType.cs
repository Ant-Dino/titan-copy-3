//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FA.LVIS.Tower.ExceptionQueueSnapshot
{
    using System;
    using System.Collections.Generic;
    
    public partial class ExceptionType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ExceptionType()
        {
            this.Exceptions = new HashSet<Exception>();
            this.ExceptionType1 = new HashSet<ExceptionType>();
        }
    
        public int ExceptionTypeId { get; set; }
        public string ExceptionTypeName { get; set; }
        public string ExceptionTypeDesc { get; set; }
        public Nullable<int> ExceptionGroupId { get; set; }
        public int ThresholdCount { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Exception> Exceptions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExceptionType> ExceptionType1 { get; set; }
        public virtual ExceptionType ExceptionType2 { get; set; }
    }
}
