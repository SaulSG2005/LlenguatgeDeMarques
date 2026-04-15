<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>Notes Universitat</title>
        <style>
          table { border-collapse: collapse; width: 50%; margin-bottom: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .suspès { background-color: #ff0000; color: white; }
        </style>
      </head>
      <body>
        <xsl:for-each select="notes/assignatura">
          <h2><xsl:value-of select="nom_assignatura"/></h2>
          <table>
            <tr>
              <th>Alumne</th>
              <th>Nota</th>
            </tr>
            <xsl:for-each select="alumnes/alumne">
              <tr>
                <xsl:if test="nota &lt; 5">
                  <xsl:attribute name="class">suspès</xsl:attribute>
                </xsl:if>
                <td><xsl:value-of select="nom"/></td>
                <td><xsl:value-of select="nota"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>