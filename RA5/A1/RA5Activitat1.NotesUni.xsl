<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <xsl:for-each select="notes/assignatura">
      <xsl:value-of select="nom_assignatura"/>
      <xsl:text>&#10;</xsl:text> <xsl:for-each select="alumnes/alumne">
        <xsl:value-of select="nom"/>
        <xsl:text> -- </xsl:text>
        <xsl:value-of select="nota"/>
        <xsl:text>&#10;</xsl:text>
      </xsl:for-each>
      
      <xsl:text>&#10;</xsl:text> </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>