using _15;
namespace _15Test;

public class UnitTest1
{
    [Fact]
    public void Test_Part1()
    {
        var input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
        var sum = Program.Part1(input);
        Assert.Equal(1320, sum);
    }
}